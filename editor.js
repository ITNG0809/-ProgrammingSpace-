// =========================
// プロジェクト情報を読み込む
// =========================

const projectData = JSON.parse(
    localStorage.getItem("currentProject")
);

if (projectData) {
    console.log("プロジェクト情報:", projectData);
}


// =========================
// プロジェクト名を反映
// =========================

const projectTitle =
    document.getElementById("projectTitle");

if (projectData && projectTitle) {
    projectTitle.value = projectData.name;
}


// =========================
// ステージ
// =========================

const stage =
    document.getElementById("stage");


// =========================
// ステージサイズを反映
// =========================

if (projectData && stage) {

    stage.style.width =
        projectData.width + "px";

    stage.style.height =
        projectData.height + "px";
}


// =========================
// 初期スプライトを作成
// =========================

let player = null;

if (
    projectData &&
    projectData.sprite &&
    projectData.sprite !== "none" &&
    stage
) {

    // スプライト画像を作成
    player = document.createElement("img");

    player.id = "player";

    player.classList.add("playerSprite");

    // =========================
    // スプライトごとの画像
    // =========================

    if (projectData.sprite === "cat") {

        player.src = "cat.svg";

    } else if (projectData.sprite === "circle") {

        player.src = "Circle.svg";

    } else if (projectData.sprite === "square") {

        player.src = "square.png";

    }


    // ステージに追加
    stage.appendChild(player);
}


// =========================
// スプライト一覧
// =========================

const spriteList =
    document.getElementById("spriteList");

if (projectData && spriteList) {

    let spriteName = "Sprite1";

    if (projectData.sprite === "cat") {

        spriteName = "ProgrammingSpace Cat";

    } else if (projectData.sprite === "circle") {

        spriteName = "円";

    } else if (projectData.sprite === "square") {

        spriteName = "四角";

    } else if (projectData.sprite === "none") {

        spriteName = "なし";
    }

    spriteList.textContent = spriteName;
}


// =========================
// ブロック関係
// =========================

const workspace =
    document.getElementById("workspace");

const blocks =
    document.querySelectorAll("#blocks .block");

let draggingBlock = null;

let offsetX = 0;
let offsetY = 0;


// =========================
// Workspace内のブロックを
// ドラッグ可能にする
// =========================

function makeDraggable(block) {

    block.addEventListener("pointerdown", function(e) {

        e.preventDefault();

        draggingBlock = block;

        const blockRect =
            block.getBoundingClientRect();

        offsetX =
            e.clientX - blockRect.left;

        offsetY =
            e.clientY - blockRect.top;

        block.setPointerCapture(e.pointerId);

    });

}


// =========================
// パレットからブロックを
// Workspaceへ追加
// =========================

blocks.forEach(block => {

    block.addEventListener("pointerdown", function(e) {

        e.preventDefault();

        draggingBlock =
            block.cloneNode(true);

        draggingBlock.classList.add(
            "workspaceBlock"
        );

        workspace.appendChild(draggingBlock);

        block.setPointerCapture(
            e.pointerId
        );

        const rect =
            workspace.getBoundingClientRect();

        draggingBlock.style.left =
            (e.clientX - rect.left) + "px";

        draggingBlock.style.top =
            (e.clientY - rect.top) + "px";

        makeDraggable(draggingBlock);

    });

});


// =========================
// ブロックを移動
// =========================

document.addEventListener(
    "pointermove",
    function(e) {

        if (!draggingBlock) return;

        const rect =
            workspace.getBoundingClientRect();

        draggingBlock.style.left =
            (
                e.clientX
                - rect.left
                - offsetX
            ) + "px";

        draggingBlock.style.top =
            (
                e.clientY
                - rect.top
                - offsetY
            ) + "px";

    }
);


// =========================
// ブロックを離す
// =========================

document.addEventListener(
    "pointerup",
    function() {

        draggingBlock = null;

    }
);


// =========================
// ブロックのタッチキャンセル
// =========================

document.addEventListener(
    "pointercancel",
    function() {

        draggingBlock = null;

    }
);

// =========================
// スプライトのドラッグ管理
// =========================

let draggingSprite = null;

let spriteOffsetX = 0;
let spriteOffsetY = 0;


// =========================
// スプライトをドラッグ可能にする
// =========================

function makeSpriteDraggable(sprite) {

    sprite.addEventListener(
        "pointerdown",
        function(e) {

            e.preventDefault();

            draggingSprite = sprite;

            const rect =
                sprite.getBoundingClientRect();

            spriteOffsetX =
                e.clientX - rect.left;

            spriteOffsetY =
                e.clientY - rect.top;

            sprite.setPointerCapture(
                e.pointerId
            );

        }
    );
}

// =========================
// 初期スプライトをドラッグ可能にする
// =========================

if (player) {
    makeSpriteDraggable(player);
}

// =========================
// スプライトを移動
// =========================

document.addEventListener(
    "pointermove",
    function(e) {

        if (!draggingSprite) return;

        const stageRect =
            stage.getBoundingClientRect();

        let x =
            e.clientX
            - stageRect.left
            - spriteOffsetX;

        let y =
            e.clientY
            - stageRect.top
            - spriteOffsetY;


        // =========================
        // ステージ外に出ないようにする
        // =========================

        const maxX =
            stage.clientWidth -
            draggingSprite.offsetWidth;

        const maxY =
            stage.clientHeight -
            draggingSprite.offsetHeight;


        x = Math.max(
            0,
            Math.min(x, maxX)
        );

        y = Math.max(
            0,
            Math.min(y, maxY)
        );


        draggingSprite.style.left =
            x + "px";

        draggingSprite.style.top =
            y + "px";

    }
);


// =========================
// スプライトを離す
// =========================

document.addEventListener(
    "pointerup",
    function() {

        draggingSprite = null;

    }
);


// =========================
// タッチ操作キャンセル
// =========================

document.addEventListener(
    "pointercancel",
    function() {

        draggingSprite = null;

    }
);

// =========================
// スプライト追加
// =========================

const addSpriteButton =
    document.getElementById("addSpriteButton");

let spriteCount = 1;

// =========================
// スプライトを追加する
// =========================

if (addSpriteButton) {

    addSpriteButton.addEventListener(
        "click",
        function() {

            spriteCount++;

            // =========================
            // 新しいスプライト
            // =========================

            const newSprite =
                document.createElement("img");

            newSprite.src = "Circle.svg";

            newSprite.classList.add(
                "playerSprite"
            );

            newSprite.id =
                "player" + spriteCount;

            // ステージに追加
            stage.appendChild(newSprite);

            // 新しいスプライトをドラッグ可能にする
            makeSpriteDraggable(newSprite);

            // =========================
            // スプライト一覧に追加
            // =========================

            const spriteItem =
                document.createElement("div");

            spriteItem.classList.add(
                "spriteItem"
            );

            spriteItem.textContent =
                "Sprite" + spriteCount;

            spriteList.appendChild(spriteItem);

        }
    );
}
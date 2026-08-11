// =========================
// 画像ファイルのプレビュー
// =========================

const pngFile = document.getElementById("pngFile");
const svgFile = document.getElementById("svgFile");
const sheetFile = document.getElementById("sheetFile");

const previewImage = document.getElementById("previewImage");
const previewEmpty = document.getElementById("previewEmpty");

const fileName = document.getElementById("fileName");
const imageSize = document.getElementById("imageSize");
const imageType = document.getElementById("imageType");


// =========================
// ファイルを読み込む
// =========================

function previewFile(file) {

    if (!file) return;

    const url = URL.createObjectURL(file);

    previewImage.src = url;
    previewImage.style.display = "block";

    previewEmpty.style.display = "none";

    fileName.textContent = file.name;
    imageType.textContent = file.type || "不明";


    // =========================
    // 画像サイズを取得
    // =========================

    previewImage.onload = function() {

        imageSize.textContent =
            previewImage.naturalWidth +
            " × " +
            previewImage.naturalHeight;

    };

}


// =========================
// PNG
// =========================

pngFile.addEventListener("change", function() {

    previewFile(this.files[0]);

});


// =========================
// SVG
// =========================

svgFile.addEventListener("change", function() {

    previewFile(this.files[0]);

});


// =========================
// スプライトシート
// =========================

sheetFile.addEventListener("change", function() {

    previewFile(this.files[0]);

});

// =========================
// プロジェクトを作成する
// =========================

function createProject() {

    // 作成画面の設定を取得
    const project = {

        name: document.getElementById("projectName").value,

        width: Number(
            document.getElementById("width").value
        ),

        height: Number(
            document.getElementById("height").value
        ),

        template: document.getElementById("template").value,

        sprite: document.getElementById("sprite").value

    };


    // プロジェクトを保存
    localStorage.setItem(
        "currentProject",
        JSON.stringify(project)
    );


    // エディターへ移動
    location.href = "editor.html";

}
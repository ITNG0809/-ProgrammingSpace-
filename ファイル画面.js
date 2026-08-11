// =========================
// ファイル画面
// =========================


// =========================
// プロジェクト検索
// =========================

const searchInput =
    document.querySelector(".search input");

const projects =
    document.querySelectorAll(".project");


searchInput.addEventListener("input", function() {

    const keyword =
        this.value.toLowerCase();

    projects.forEach(function(project) {

        const name =
            project.querySelector("h3")
                .textContent
                .toLowerCase();

        if (name.includes(keyword)) {

            project.style.display = "";

        } else {

            project.style.display = "none";

        }

    });

});


// =========================
// プロジェクトをクリック
// =========================

projects.forEach(function(project) {

    project.addEventListener("click", function() {

        const name =
            project.querySelector("h3").textContent;

        console.log("プロジェクトを選択:", name);

    });

});
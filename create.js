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
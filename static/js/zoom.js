function imageZoom(imgID1, imgID2, resultID1, resultID2) {
    var img1 = document.getElementById(imgID1);
    var img2 = document.getElementById(imgID2);
    var result1 = document.getElementById(resultID1);
    var result2 = document.getElementById(resultID2);
    var lens1 = document.createElement("DIV");
    var lens2 = document.createElement("DIV");
    lens1.setAttribute("class", "img-zoom-lens");
    lens2.setAttribute("class", "img-zoom-lens");
    img1.parentElement.insertBefore(lens1, img1);
    img2.parentElement.insertBefore(lens2, img2);

    var cx1 = result1.offsetWidth / lens1.offsetWidth;
    var cy1 = result1.offsetHeight / lens1.offsetHeight;
    var cx2 = result2.offsetWidth / lens2.offsetWidth;
    var cy2 = result2.offsetHeight / lens2.offsetHeight;

    result1.style.backgroundImage = "url('" + img1.src + "')";
    result1.style.backgroundSize = (img1.width * cx1) + "px " + (img1.height * cy1) + "px";
    result2.style.backgroundImage = "url('" + img2.src + "')";
    result2.style.backgroundSize = (img2.width * cx2) + "px " + (img2.height * cy2) + "px";

    img1.addEventListener("mousemove", moveLens);
    img2.addEventListener("mousemove", moveLens);
    img1.addEventListener("touchmove", moveLens);
    img2.addEventListener("touchmove", moveLens);

    function moveLens(e) {
        e.preventDefault();
        var img, lens, result, cx, cy;

        if (e.target.id === imgID1 || e.target.id === resultID1) {
            img = img1;
            lens = lens1;
            result = result1;
            cx = cx1;
            cy = cy1;
        } else {
            img = img2;
            lens = lens2;
            result = result2;
            cx = cx2;
            cy = cy2;
        }

        var pos = getCursorPos(e, img);
        var x = pos.x - (lens.offsetWidth / 2);
        var y = pos.y - (lens.offsetHeight / 2);

        if (x > img.width - lens.offsetWidth) { x = img.width - lens.offsetWidth; }
        if (x < 0) { x = 0; }
        if (y > img.height - lens.offsetHeight) { y = img.height - lens.offsetHeight; }
        if (y < 0) { y = 0; }

        lens.style.left = x + "px";
        lens.style.top = y + "px";
        result.style.backgroundPosition = "-" + (x * cx) + "px -" + (y * cy) + "px";

        // Sync the other lens
        var otherLens = (lens === lens1) ? lens2 : lens1;
        var otherResult = (result === result1) ? result2 : result1;
        var otherCx = (cx === cx1) ? cx2 : cx1;
        var otherCy = (cy === cy1) ? cy2 : cy1;

        otherLens.style.left = x + "px";
        otherLens.style.top = y + "px";
        otherResult.style.backgroundPosition = "-" + (x * otherCx) + "px -" + (y * otherCy) + "px";
    }

    function getCursorPos(e, img) {
        var a = img.getBoundingClientRect();
        var x = e.pageX - a.left - window.pageXOffset;
        var y = e.pageY - a.top - window.pageYOffset;
        return { x: x, y: y };
    }
}

function setActiveButton(button) {
    var buttons = document.querySelectorAll('.buttons-container button');
    buttons.forEach(function(btn) {
        btn.classList.remove('active');
    });
    button.classList.add('active');
}

// function changeCondition(condition) {
//     var images = [
//         { id: 'myimage1', base: 'pano_images/vienna/vienna_original.jpg' },
//         { id: 'myimage2', base: 'pano_images/vienna/ours/ours' }
//     ];

//     images.forEach(function(image) {
//         var img = document.getElementById(image.id);
//         if (image.id === 'myimage1') {
//             img.src = image.base; // 원본 이미지 유지
//         } else {
//             img.src = image.base + '_' + condition + '.png'; // 조건에 따른 이미지 변경
//         }
//     });

//     imageZoom('myimage1', 'myimage2', 'myresult1', 'myresult2');
// }

function changeCondition(condition) {
    var extension = condition === 'ivy' ? 'jpg' : 'png';
    originalImage1 = 'pano_images/vienna/original/' + condition + '.' + 'jpg';
    csdImage1 = 'pano_images/vienna/csd/' + condition + '.' + 'png';
    syncImage1 = 'pano_images/vienna/sync/' + condition + '.' + 'png';
    oursImage = 'pano_images/vienna/ours/' + condition + '.' + 'jpg'; // oursImage 경로 변경
    
    // 이미지를 변경하고 줌 효과를 재적용합니다.
    document.getElementById('myimage1').src = originalImage1;
    document.getElementById('myimage1').nextElementSibling.textContent = 'Original'; // myimage1의 caption을 'Original'로 변경
    document.getElementById('myimage2').src = 'pano_images/vienna/ours/' + condition + '.' + 'jpg';
    imageZoom('myimage1', 'myimage2', 'myresult1', 'myresult2'); // Reapply zoom effect

    // 활성화된 버튼을 설정합니다.
    setActiveButton(document.getElementById('condition' + (condition === 'ivy' ? '1' : '2')));
}

function changeImage(imagePath1, imagePath2, captionText, imgID, resultID, imgID2, resultID2) {
    var img1 = document.getElementById(imgID);
    var result = document.getElementById(resultID);
    var img2 = document.getElementById(imgID2);
    var result2 = document.getElementById(resultID2);

    img1.src = imagePath1;
    // img2.src = imagePath2;
    img1.nextElementSibling.textContent = captionText; // Change the caption text
    result.innerHTML = ""; // Clear previous result
    // result2.innerHTML = ""; // Clear previous result
    imageZoom(imgID, imgID2, resultID, resultID2); // Reapply zoom effect
    var imageHeight = img1.height;
    var imageHeight2 = img2.height;
    result.style.height = imageHeight + "px";
    // result2.style.height = imageHeight2 + "px";
}
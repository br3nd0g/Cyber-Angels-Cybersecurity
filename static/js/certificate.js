function getNameInput(){
  document.body.insertAdjacentHTML('afterbegin', `
    <div id="certificateNameDownload">
      <div>
        <p>Please input your name (this will not be saved):</p>
        <input id="nameInput" type="text">
        <button onclick="downloadCertificate()" class="styleButton">Download</button>
      </div>
    </div>
  `)
}

function downloadCertificate(){
  const name = document.getElementById('nameInput').value;

  if(name.length <= 0){
    alert("Please enter a name.")
  }
  else{
    var download = document.createElement('a');
    download.download = 'certificate.png';

    getImageUrl(download, name);

    document.getElementById('certificateNameDownload').remove();
  }
}

function getImageUrl(downloadAnchor, name) {
  
    var canvas = document.createElement("canvas");
    canvas.width = certificateImg.width;
    canvas.height = certificateImg.height;

    var ctx = canvas.getContext("2d");
    ctx.drawImage(certificateImg, 0, 0);

    ctx.font = '68px Krungthep';
    ctx.fillStyle = '#FD6768';
    ctx.textBaseline = 'bottom';
    ctx.textAlign = "center";
    ctx.fillText(name, 1190, 900);

    canvas.toBlob(function(blob){
      
      const imageLink = URL.createObjectURL(blob);
      downloadAnchor.href = imageLink;
      downloadAnchor.click();
      
    },'image/png');
}
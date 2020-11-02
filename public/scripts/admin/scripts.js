//menu ativo
const currentPage = location.pathname;
const menuItems = document.querySelectorAll(".header a");
for (const item of menuItems) {
  currentPage.includes(item.getAttribute('href')) ? item.classList.add("active") : '';
}

/*
function readImage() {
  if (this.files && this.files[0]) {
      var file = new FileReader();
      file.onload = function(e) {
          document.getElementById("img-preview").src = e.target.result;
      };       
      file.readAsDataURL(this.files[0]);
  }
}

document.getElementById("avatar").addEventListener("change", readImage, false);

*/

const PhotosUpload = {
  preview: document.querySelector("#images-preview"),
  uploadLimit: 5,
  files: [],
  input: '',

  getContainer(image) {
    const container = document.createElement('div');
    container.classList.add('image');
    container.onclick = PhotosUpload.removeImage
    container.appendChild(image);
    container.appendChild(PhotosUpload.getRemoveButton());
    return container;
  },

  hasLimit(event) {
    const { files: fileList } = event.target;
    const { uploadLimit, preview } = PhotosUpload;

    if (fileList.length > uploadLimit) {
      alert(`Envie no máximo ${uploadLimit} imagens`);
      event.preventDefault();
      return true;
    }
    const imagesDiv = [];
    preview.childNodes.forEach(item => {
      if (item.classList && item.classList.value == 'image')
        imagesDiv.push(item)
    });

    const totalImages = fileList.length + imagesDiv.length;

    if (totalImages > uploadLimit) {
      alert("Limite de fotos atingido");
      event.preventDefault();
      return true;
    }

    return false;
  },

  getAllFiles() {
    const dataTransfer = new DataTransfer() || new ClipboardEvent("").clipboardData;
    PhotosUpload.files.forEach(file => dataTransfer.items.add(file))
    return dataTransfer.files;
  },

  getRemoveButton() {
    const button = document.createElement('i');
    button.classList.add('material-icons');
    button.innerHTML = "close";
    return button;
  },

  removeImage(event) {
    const imageDiv = event.target.parentNode;
    const imageArray = Array.from(PhotosUpload.preview.children);
    const index = imageArray.indexOf(imageDiv);

    PhotosUpload.files.splice(index, 1);
    PhotosUpload.input.files = PhotosUpload.getAllFiles();
    imageDiv.remove();
  },

  handleFileInput(event) {
    const { files: fileList } = event.target;
    PhotosUpload.input = event.target;

    if (PhotosUpload.hasLimit(event)) return;

    Array.from(fileList).forEach(file => {
      PhotosUpload.files.push(file);
      const reader = new FileReader();
      reader.onload = () => {
        const image = new Image();
        image.src = String(reader.result);
        const div = PhotosUpload.getContainer(image);
        PhotosUpload.preview.appendChild(div);
      }
      reader.readAsDataURL(file);
    });

    PhotosUpload.input.files = PhotosUpload.getAllFiles();
  }
}
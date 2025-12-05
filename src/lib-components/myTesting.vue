<template>
    <div>
      <!-- Upload Images Btn -->
      <div class="file-upload">
         <div class="file-select">

           <div class="file-select-button" >
             <img class="file-image" :src="img">
           </div>
           <div v-if="inputImages.length" class="file-ready">{{inputImages.length ? (options&&options.ready) ? options.ready : local.ready : " "}}</div>
           <b v-if="inputImages.length >= 1" style="font-size:15px;padding-left:10px;color:#555;">{{inputImages.length}}
              <span v-if="inputImages.length == 1">file</span>
              <span v-if="inputImages.length > 1">files</span>
              {{options&&options.select ? options.select : local.select}}.
          </b>
          <span v-else style="letter-spacing:2px;color:#777;padding-left:7px;"> {{options&&options.max ? options.max : local.max}} {{max??' . . .'}}</span>
           <div @change="imageDetect">
             <input type="file" accept="image/*" multiple>
           </div>
         </div>
      </div>

      <div :onload="clearProperty()"></div>

      <!-- Images Live Preview -->
      <div class="rowc" :load="loadImagePreview()">
          <div class="colc-4" style="padding:10px 2px;margin-top:20px;" v-for="(img,key) in imagesLivePreview" :key="key">
            <div class="imghover">
              <img :title="'remove-'+img.name" @click="removeImgPreview(img.name)" v-bind:ref="'image'+img.name" :alt="img.name" class="imgPreview"/>
              <i @click="removeImgPreview(img.name)" class="delIcon">ⓧ</i>
            </div>
          </div>
      </div>
   </div>
  </template>

  <script>
  import { defineComponent } from "vue";
  export default /*#__PURE__*/defineComponent({
   name :"VueUploadZakerxa",
      data() {
         return {
          local : {
              max : 'Maximun',
              select : 'Selected',
              ready : 'Ready'
          },
          inputImages  : [],
          imagesLivePreview : [],
          imagesRender : [],
          dataClear : {
              clear : false
          },
          img : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAB2AAAAdgB+lymcgAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAlySURBVHic7ZtbbFxHGcd/cy679u5642uwnThp4joNbUmV9IbaQimlCJCQuAipEQ8IgZBKJWSqviGkSjy2DyD1oS4JFQgJqRQhKiSK0iJAKWojtRUtjS9N7NiJ7fiy671495zdc84MD2uvfby7wfY5TgL4/zbjnW/+85+Zb2a+7xh2sYtd7OL/GGKnDL/88suRTCbzFeDQVtoppYxCoXCb4zidAJqmjcZisR8/+eSTyzvBc0cEOH36dIuU8g3g3u3aSKfT2LYNgGmahVgs1j84ODgXFsdVaGEbBPA876cEGDxAW1sbhmEA4DhO3Lbtv4fBbSNCF+D06dOfF0J8O6gdIQStra3VcqlUOvLss88+E9RuTT9hGnvppZdaXdf9ANgfls1cLsfycmX7a5omW1pabh8cHBwNy77R6A9DQ0Mxz/OiG+ufeOKJjBBC1Wvjuu4LhDh4gGQySalUwnEcpJSabdt/AfaFZb/uCjh16tR3lVJD1N8i7+fz+U8+9dRT1vrKF1988XEhxG/CIrYejuOwuLiIUhXd4/H4z55++unBMGzX9QFKqccb/Q04Fo/Hj62vGBoa6hFCPB8GoXowTZOWlpZq2bKsHzz33HOBnOwqGg1Sv1YjXdd9W0cI8XOgIwxCjZBIJDBNEwAppXAc509KqcBOXADkHfWwgC8pQSvAR8PnD1rFQqxRo0MDt022JJNFAKtYbJu5PPWNoEQ2A6UUnucBIIRwe/sOvJpoaVncTFvpySa7XL7FddwuoYmcENqve/bEnheFsvqeErzADt4KbybkCgVKZQeAJjPyS7FcVpcQHLzBvK4bHM8jk8sDoGuaa/wvDt7zPEaHz+M4lZlujsU4cttRAHSx5jY8KY2G94CdgJSS1MI8mcwShXyebCZDsVigXC4TTyTo3befgaO3V53ddvHq73/Hr35xylf3o2d+wj333V/z2+siwOz0FcYvjDFzeQrXdev+Jr24wOj5D3ntj6/S3tHBXcfv5vi9tYQ3g+N338P4xQtIKQGIRqP03zpQ97di2VF1b3VhYP7qLO+ee4uldGrTbTzPI5vNYts2zc3NfPqzn+POu46HxklKRSqbrZZ3RADXdXnv3FtcGBvZtg3btslms3ieR+++/Xzt8W8SjdbczLeMHRfAtiz+9vqfSacaH8+abtCUSBLp6AYUTiGPvbSIV7Z9v/M8j1Qqheu6xGIxTn7rO7S2tQXiVyPAyZMnQxMgEolw4sQJYrHaO5SmG3Tdcivt+w6S7PwYQtOQQMlT5B0oeArdK+OlZlj84FxVDCklqVQKx3HQNI3x8fFqoGQ7kFKSTqer5dCcoKZpHDt2rO7g9x4+Qt8dxzGjzf42QLMuaNbBVbBYilLcewt7Hz2Id3WC+ffOomka7e3tLCwsIKWkv7+fkZGR6o0wMO9QrAD9/f0kk0m/cU3n1vs+xeETD9QMfiMMIehuEnRGNTwEdB9m/6NfR480oes6bStL3/M8+vv7w6IdjgAtLS309fX5DesGt3/mC3QeqCWrFNgSlj1FacNEJg3YG63cysuRON2PfBXdiBCNRqurS9M0OjrCeXuFIsDAQO0Z23/PAyTau3x1rlIsliSTRcmMJZm3FXOlWheUMARtkYoIjmbS/fCXAXxP4u7u7jCoBxcgmUz6YncAnQf66eg77KsruoorliLnghKVvZ80BJ0NTrZWU9C0ws6JxOm68350XScejwOVrRDGKggsQG9vr68sNI2+O/wXF8tTXC0ppIIWAw40C3qaBJ1RQUyv/wgVQHt0jZ7ZdwTNMGluXvMlnZ2dQekHE0AIUTMLHfsPEY0nqmVPwfzKMm+PCLqiGrrY3Mu7SYNVDVwEHR8/QSQSQdMqlbp+zbjNphBIgObm5prbWVuv3xlmHYWnKvu61dx6yCGxboWYeyvx1tU+pZQ1J89WEUiA1f24Hq3d/oDt8srbp30bgwdoMtbayWjlFFj/WkwkEjVttoLAK2A9jEgU3Vgj58iK549qYGyzp/W6SSUwmhO+pR/0fRBIgNW9uAoz2uQruyvPDEPbfrRNE/5YXTTZ6us3qB8INTWmlPSVTQ2adIgH4KjAp4Dy3Gp+IAwEegtsDG6ULV+uBEMIepuCxVqlUqwfbymX8QkQ9E0QaAVYGwYsPZeyXQxEaCMcuSagjsIr2z7hN3LYKgIJsJq0XI+lmStBTNag6K3NtmZV3vGrwU6oJE+DIJAApVKJYtE/40szk4EIbURhnQDF6fFqv1Bxwhv73yoCO8GFhQVfOXN1mnxqPqhZAJZdhbPiV03lsvTRv7Btu+oDyuVy4D4CCzAzM1Pjlac+eCewp5bAklOxIYDl4XcAfDM+Nxf8i5nAAliWxfy8f8bzi3Nc+fC9QHYXS2uzr6VnyE6O4jiOLxyWz+cD9QEh3QMuXrxYcxxNj7zP3PjYtuylyopltzL7ppVl9u3XgbUBCyG4fPlyAMZrCEUA27a5cOFCTf3Eu/9g8p/nYJPbQQLzJUl2Zelr6Wmm//oHAAqFQnX2LcuiUCiEQT28oOj09DTJZJKenh5f/exH58nOzdD3ibtp6+mr21ZRiRkslhSuAtMtkxt+m/yVCaDi7NYfd5cuXQqLdripsZGRESKRSE2MoJjLMPrmGyTaO2nfd5DW7v1E4glczcTyFMuOBClheQl7coz5y2uryXEc0uk0Sik0TWNkZPvJlnoINS8Alf159OjRmpVQD0ZTHJC4dv3bXKlUqg4eYGxsrJrv2y62lBdYTUZs5cWllGJ4eJhMJsPAwED1Y8d6cO3G+ziXy1X3uWVZTE5u/YLleR5Symtmmxuyk1KSzWYxDKMm6LkZzM7OkkqlOHToED09PTVP50ZYzQlKKZFSMjk5ue1MUD6fx3VdOjo6EA3CcA0F0DQN0zQD5erL5TKjo6NMTEzQ3d1NV1cXyWSyhozruhSLRSzLQimFbdvMzs4GfuhEIhGEEA0HD/9hC+zZsycQgVWUy2WmpqaYmppC13VisVg1niiEwPM8LMsil8s1/H5gO6iXptsIA1gGggXWtgDP88jn86Hc4oJCCKE04LUbTeR6YvUlCWAYxrThuu73dV3XhBBfBK6dwfwvhlKq+nwXQmCa5rRS6tG63uGxxx5LAe3XmeNOI33mzJmaXFqjs2n7XyDcvKg7pkYCvLKDRG4Ufluvsu4x+OCDD/7w7NmzbwohtvQPTzcrlFITDz300Ctnzpy50VR2sYtd7OLmwr8BFbv42fAVGI8AAAAASUVORK5CYII='
        }
      },
      emits: ['dataImage'],
      props:{
         max        : {type : Number,default: 6},
         accept: {type : Array, default : ['image/jpeg', 'image/png', 'image/jpg', 'image/gif']},
         imageSize  : {type :Number,default : 4e6},
         dataReset  : Object,
         options    : Object,
         preview : { type:Object, default : { w : 100, h : 100, keepRatio : false} },
         resize  : Object,
        },
      methods:{
          async loadImagePreview(){
              if (this.imagesLivePreview.length > 0) {
                let src = new ZakerxaImage();
                for (let i = 0; i < this.imagesLivePreview.length; i++) {
                  src.resizeImage(this.imagesLivePreview[i],this.preview).then(res=>{
                    this.$refs['image'+`${this.imagesLivePreview[i].name}`][0].src = URL.createObjectURL(res[0]);
                  })
                //   this.$refs['image'+`${this.imagesLivePreview[i].name}`][0].src = await src.preview(this.imagesLivePreview[i],this.preview);
                }
             }
          },
          removeImgPreview(e){
              let item = this.inputImages.find(res => res.name == e );
              this.inputImages.remove(item);

              let previewitem = this.imagesLivePreview.find(res => res.name == e );
              this.imagesLivePreview.remove(previewitem);

              let rederitem = this.imagesRender.find(res=>res.name == e);
              this.imagesRender.remove(rederitem);

              console.log("Preview",this.inputImages)
              this.$emit('dataImage',this.imagesRender);
          },
          imageValidation(container,maxsize){
            if(this.inputImages.length == 0){
              if (parseInt(container.length) > this.max) { // parseInt($fileUpload.get(0).files.length)
                alert('The maximun number of photo limit is ' + this.max);
                let dA = [];
                for (let i = 0; i < this.max; i++) dA.push(container[i]);
                container = dA;
              }
            }else{
              const sameFile = this.inputImages.filter(e => {
                  for (var i = 0; i < container.length; i++)  if (e.name == container[i].name) return true;
                  return null;
              });

              if (sameFile.length > 0)  for (let i = 0; i < sameFile.length; i++) this.inputImages.remove(sameFile[i]);
              let ilength = this.inputImages.length;
              let totalFile = container.length + ilength;
              if (totalFile > this.max) {
                let dA = [];
                let loopLength = this.max - ilength;
                for (let i = 0; i < loopLength; i++) dA.push(container[i]);
                alert("The maximun number of photo limit is " + this.max);
                container = dA
              }
            }

            const imagesTypeInvalid = container.filter(check => {
              var match = this.accept;
              if (!(match.includes(check.type))) return true;
              return false;
            });

            const imagesSize = container.filter(check => {
              if(check.size >= maxsize) return true;
            });

            if(imagesSize.length >= 1){
              alert(`${imagesSize[0].name} file size in too much.We will remove all of these file.`);
              for (let i = 0; i < imagesSize.length; i++) container.remove(imagesSize[i]);
            }
            //  Final Process
            if (imagesTypeInvalid.length > 0) {
              for (let i = 0; i < imagesTypeInvalid.length; i++) container.remove(imagesTypeInvalid[i]);
              return container;
            }
            return container;
          },
         imageDetect(e){
             if (window.File && window.FileList && window.FileReader) {
                let src = new ZakerxaImage();
                if (this.inputImages.length == 0) {
                  let firtCaseImage = e.target.files || e.dataTransfer.files;
                  firtCaseImage = Array.prototype.slice.call(firtCaseImage);
                  // Validator
                  let firstCaseImage = this.imageValidation(firtCaseImage,this.imageSize);

                  firstCaseImage.map(e => {
                      this.imagesLivePreview.push(e);
                      this.inputImages.push(e);
                  });

                  let tempContainer = [];
                  this.inputImages.map(async e=>{
                    tempContainer.push(await src.fileResize(e,this.resize))
                    this.imagesRender = tempContainer;
                    this.$emit('dataImage',this.imagesRender);
                  })

                }
                else {
                  let secCaseImage = e.target.files || e.dataTransfer.files;
                  secCaseImage = Array.prototype.slice.call(secCaseImage);
                  // Validator
                  secCaseImage = this.imageValidation(secCaseImage,this.imageSize);
                  console.log(secCaseImage);

                  secCaseImage.map( e => this.inputImages.push(e));

                  this.imagesLivePreview = this.inputImages;

                  let tempContainer = [];
                  this.inputImages.map(async e=>{
                     tempContainer.push(await src.fileResize(e,this.resize))
                     this.imagesRender = tempContainer;
                     console.log("Final State",this.imagesRender)
                      this.$emit('dataImage',this.imagesRender);
                  })

                }

              } else console.log("Your browser is not supports files format.");
          },
          clearProperty(){
            if(this.dataReset.clear){
              this.inputImages = [];
              this.imagesLivePreview = [];
              this.imagesRender = [];
              this.$emit('dataImage',this.imagesRender);
              this.dataReset.clear = false;
            }
          }
      },
      created(){
          if(this.dataReset)this.dataClear = this.dataReset;
          Array.prototype.remove = function() {
              var what, a = arguments,
                  L = a.length,
                  ax;
              while (L && this.length) {
                  what = a[--L];
                  while ((ax = this.indexOf(what)) !== -1) this.splice(ax, 1);
              }
              return this;
          }
      }
  });

  class ZakerxaImage {

    constructor(){
    }

    async createImg(file){
        let imageReader = new FileReader();
        // imageReader.onload = (() =>  this.$refs['image' + `${this.imagesLivePreview[i].name}`][0].src = imageReader.result);
        // imageReader.readAsDataURL(this.imagesLivePreview[i]);
        const dataURL = await new Promise(resolve => {
             imageReader.onload = (e) => resolve(e.target.result);
             imageReader.readAsDataURL(file);
        });
        const img = new Image();
        await new Promise(resolve => {
            img.onload = resolve;
            img.src = dataURL;
        });
        return img;
    }

    canvas(img,resize){
      // Resize the image with a canvas
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      let [maxWidth, maxHeight] = [105, 100];
      let [imgWidth, imgHeight] = [ img.naturalWidth, img.naturalHeight ];
      const ratio = Math.min(maxWidth / imgWidth, maxHeight / imgHeight);
      let fw = imgWidth * ratio;
      let fh = imgHeight * ratio;
      resize.w ? fw = resize.w : fw;
      resize.h ? fh = resize.h : fh;
      canvas.width = fw;
      canvas.height = fh;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      return canvas;
    }

    async preview(file,resize){
      return this.canvas(await this.createImg(file),resize).toDataURL(file.type, 1)
    }

    async render(file,resize){
      return this.canvas(await this.createImg(file),resize)
    }

    canvasToFile(file){
        canvas.toBlob((blob) => {
           new File([blob], file.name, { type: file.type })
        }, 'image/jpeg');
    }


    fileResize(file,resize){
        return new Promise((resolve, reject) => {
            if(file) this.resizeImage(file,resize).then(Blob=> {
                const name   =  file.name.replace(".", "-").slice(0,5) + '-' + this.makeId(7)+'-zakerxa-'+Math.ceil(Blob[1])+'-'+Math.ceil(Blob[2])+'.jpg';
                const render = new File([Blob[0]], name, { lastModified: new Date().getTime(),size : Blob[0].size, type: "image/jpeg" });
                resolve(render)
            });
            else reject(new Error('No file detect'))
        })
    }

    dataURItoBlob(dataURI) {
        const bytes = (dataURI.toString().split(',')[0].indexOf('base64') >= 0) ? atob(dataURI.split(',')[1])
          : unescape(dataURI.split(',')[1]);
        const mime = dataURI.split(',')[0].split(':')[1].split(';')[0];
        const max = bytes.length;
        const ia = new Uint8Array(max);
        for (let i = 0; i < max; i += 1) ia[i] = bytes.charCodeAt(i);
        return new Blob([ia], { type: mime });
    }

    reSize(image,resize){
        const canvas = document.createElement('canvas');
        let [maxWidth, maxHeight] = [resize.w, resize.h];
        let [imgWidth, imgHeight] = [ image.naturalWidth, image.naturalHeight ];
        const ratio = Math.min(maxWidth / imgWidth, maxHeight / imgHeight);
        let fw = imgWidth * ratio;
        let fh = imgHeight * ratio;
        if(!(resize.keepRatio??(resize.keepRatio = false))){
          fw = resize.w;
          fh = resize.h;
        }
        canvas.width = fw;
        canvas.height = fh;
        canvas.getContext('2d').drawImage(image, 0, 0, fw, fh);
        const dataUrl = canvas.toDataURL('image/jpeg',1);
        return [this.dataURItoBlob(dataUrl),fw,fh];
    }


    resizeImage(file,resize){
        const reader = new FileReader();
        const image = new Image();

        return new Promise((resolve, reject) => {
          if (!file.type.match(/image.*/)) {
            reject(new Error('Not an image'));
            return;
          }

          reader.onload = (readerEvent) => {
            image.onload = () => resolve(this.reSize(image,resize));
            image.src = readerEvent.target.result;
          };
          reader.readAsDataURL(file);
        });
    }
  }
  </script>



  <style scoped>
  .colc-4 {
    width: 33.33%;
  }

  * {
    box-sizing: border-box;
  }

  .rowc {
    display: table;
    border-radius: 5px;
    padding-top: 5px;
  }

  @media only screen and (max-width: 476px) {
    /* For mobile phones: */
    [class*="colc-"] {
      display: inline;
      width: 33.33%;
    }
  }

  @media only screen and (min-width: 476px) and (max-width: 768px) {
    /* For mobile phones: */
    [class*="colc-"] {
      display: inline;
      width: 25%;
    }
  }

  @media only screen and (min-width: 769px) {
    /* For mobile phones: */
    [class*="colc-"] {
      display: inline;
      width: 20%;
    }
  }

  .imgPreview {
    /* height: 110px; */
    cursor: pointer;
    /* width: 105px; */
  }

  .imghover {
    border: 2px solid #dfd4d4;
    position: relative;
    display: inline-block;
  }

  .imghover:hover {
    box-shadow: 2px 2px 5px #4594e4;
    transition: all 0.2s ease-in-out;
    -moz-transition: all 0.2s ease-in-out;
    -webkit-transition: all 0.2s ease-in-out;
    -o-transition: all 0.2s ease-in-out;
  }

  .file-upload {
    display: block;
    text-align: center;
    font-family: sans-serif;
    font-size: 14px;
    position: relative;
  }

  .file-select {
    display: flex;
    align-items: center;
    border: 2px solid #dce4ec;
    color: #243342;
    cursor: pointer;
    height: 40px;
    border-radius: 8px;
    text-align: left;
    background: #f8f8f8;
    overflow: hidden;
    position: relative;
    width: 100%;
  }

  .file-select-button {
    background: #dce4ec;
    padding: 5px 8px;
    min-height: 40px;
    display: inline-block;
    font-weight: bold;
  }

  .file-ready {
    background: #dce4ec;
    padding: 12px 10px 12px 0;
    display: inline-block;
    font-weight: bold;
  }

  .file-image {
    width: 27px;
    margin: 0;
  }

  .file-upload .file-select:hover {
    border-color: #80a3c5;
    transition: all 0.3s ease-in-out;
    -moz-transition: all 0.3s ease-in-out;
    -webkit-transition: all 0.3s ease-in-out;
    -o-transition: all 0.3s ease-in-out;
  }

  .file-upload .file-select:hover .file-select-button {
    background: #65a5e6;
    transition: all 0.2s ease-in-out;
    -moz-transition: all 0.2s ease-in-out;
    -webkit-transition: all 0.2s ease-in-out;
    -o-transition: all 0.2s ease-in-out;
  }

  .file-upload .file-select:hover .file-ready {
    background: #65a5e6;
    color: #f8f8f8;
    transition: all 0.2s ease-in-out;
    -moz-transition: all 0.2s ease-in-out;
    -webkit-transition: all 0.2s ease-in-out;
    -o-transition: all 0.2s ease-in-out;
  }

  .file-upload-input {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    opacity: 0;
    z-index: 101;
  }

  input[type="file"] {
    z-index: 100;
    cursor: pointer;
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    opacity: 0;
    filter: alpha(opacity=0);
  }

  .file-upload .file-select.file-select-disabled {
    opacity: 0.65;
  }

  .file-upload .file-select.file-select-disabled:hover {
    cursor: default;
    display: block;
    border: 2px solid #dce4ec;
    color: #34495e;
    cursor: pointer;
    height: 40px;
    line-height: 40px;
    margin-top: 5px;
    text-align: left;
    background: #ffffff;
    overflow: hidden;
    position: relative;
  }

  .file-upload .file-select.file-select-disabled:hover .file-select-button {
    background: #dce4ec;
    color: #666666;
    padding: 0 10px;
    display: inline-block;
    height: 40px;
    line-height: 40px;
  }

  .file-upload .file-select.file-select-disabled:hover .file-select-name {
    line-height: 40px;
    display: inline-block;
    padding: 0 10px;
  }

  .delIcon {
    position: absolute;
    display: inline-block;
    top: -2px;
    right: 3px;
    font-size: 18px;
    font-style: normal;
    font-weight: bolder;
    color: rgb(231, 20, 20);
    cursor: pointer;
  }
  </style>

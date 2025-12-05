<template>
  <div @dragover="dragging" @drop="onDrop" @dragover.prevent ref="zakerxaDragBox">
   <!-- [ Zin Min Htet || Zakerxa ]-->
   <!-- Here is Github Link => https://github.com/Zakerxa/ -->
   <!-- Here is Facebook Link => https://www.facebook.com/mm.zakerxa -->
   <div v-if="alertS" class="zakerxaMultipleImageAlertOverlay">
    	<div class="zakerxaMultipleImageAlertpopup">
    		<h4>{{alertH}}</h4>
    		<a class="close" @click="alertS=false">&times;</a>
    		<div class="content" style="padding:5px 2px;">
    			{{alertB}}
    		</div>
    	</div>
    </div>

    <!-- Upload Images Btn -->
    <div class="zakerxa-upload">
       <div class="file-select" :style="[dragBoxStyle ? 'border:4px dotted #ddd;padding:2px;height:80px;' : '']">
         <div class="file-select-button" >
           <img class="file-image" ref="camera"> <div v-if="!inputImages.length" class="file-ready">{{dragBoxStyle ? 'Dragging' : ''}}</div> <div v-if="inputImages.length" class="file-ready">{{inputImages.length ? (options&&options.ready) ? options.ready : local.ready : " "}}</div>
         </div>
         <b v-if="inputImages.length >= 1" 
          style="font-size:15px;padding-left:10px;color:#555;">{{inputImages.length}}
            <span v-if="inputImages.length == 1">file</span>
            <span v-if="inputImages.length > 1">files</span>
            {{options&&options.select ? options.select : local.select}}.
        </b>
        <span v-else style="letter-spacing:2px;color:#777;padding-left:7px;text-align: center;"> {{options&&options.max ? options.max : local.max}} {{max??' . . .'}}</span>
         <div @change="imageDetect">
           <input type="file" accept="image/*" multiple>
         </div>
       </div>
    </div>

    <div :onload="clearProperty()"></div>

    <!-- Images Live Preview -->
    <div class="rowc" :onload="loadImagePreview()">
        <div class="colc-4" style="padding:10px 2px;margin-top:20px;" v-for="(img,key) in imagesLivePreview" :key="key">
          <div class="imghover">
            <img draggable="false" :title="'remove-'+img.name" @click="removeImgPreview(img.name)" v-bind:ref="'image'+img.name" :alt="img.name" class="imgPreview"/>
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
        dragBoxStyle : false,
        local : {
            max : 'Maximun',
            select : 'Selected',
            ready : 'Ready'
        },
        alertS : false,
        alertH:'',
        alertB: '',
        inputImages  : [],
        imagesLivePreview : [],
        imagesRender : [],
        global       : new ZakerxaImage(),
        dataClear : {
            clear : false
        },
        img : 'data:image/png;base64,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'
      }
    },
    emits: ['dataImage'],
    props:{
       max        : {type : Number,default: 6},
       accept: {type : Array, default : ['image/jpeg', 'image/png', 'image/gif']},
       imageSize  : {type :Number,default : 4e6},
       dataReset  : Object,
       options    : Object,
       preview : { type:Object, default : { w : 100, h : 100, keepRatio : false} },
       resize  : Object,
       alertTimeout : {type : Number,default: 3e3}
      },
    methods:{
        myAlert(title,body,timer){
          this.alertH=title,this.alertB=body,this.alertS=!0,setTimeout(()=>this.alertS=!1,timer);
        },
        dragging(e){
          e.preventDefault();e.stopPropagation();this.dragBoxStyle = true;
        },
        onDrop(e) {
          e.preventDefault(),e.stopPropagation(),this.dragBoxStyle=!1,e.dataTransfer.files?this.imageDetect(e,!0):console.log("No Data");
        },
        async loadImagePreview(){
          if(this.imagesLivePreview.length>0)for(let i=0;i<this.imagesLivePreview.length;i++)this.global.resizeImage(this.imagesLivePreview[i],this.preview).then(e=>{this.$refs[`image${this.imagesLivePreview[i].name}`][0].src=URL.createObjectURL(e[0])});
        },
        removeImgPreview(e){
          let item=this.inputImages.find(i=>i.name==e);this.inputImages.remove(item),this.imagesLivePreview.remove(item);let name=e.toLowerCase();this.resize&&(e.endsWith(".webp")||e.endsWith(".jpeg")?name=name.slice(0,-4)+"jpg":(e.endsWith(".png")||e.endsWith(".svg")||e.endsWith(".gif")||e.endsWith(".psd")||e.endsWith(".pdf"),name=name.slice(0,-3)+"jpg"));let rederitem=this.imagesRender.find(i=>i.name.toLowerCase()==name);this.imagesRender.remove(rederitem),this.$emit("dataImage",this.imagesRender);
        },
        imageValidation(container,maxsize){
          if(0==this.inputImages.length&&parseInt(container.length)>this.max){let e="The maximun number of file limit is "+this.max+" & we will remove the other file.";this.myAlert("File Limit Reached !",e,this.alertTimeout);let t=[];for(let i=0;i<this.max;i++)t.push(container[i]);container=t}
          else{
            const sameFile=this.inputImages.filter(e=>{for(var n=0;n<container.length;n++)if(e.name==container[n].name)return!0;return null});
            if(sameFile.length>0)for(let i=0;i<sameFile.length;i++)this.inputImages.remove(sameFile[i]);let ilength=this.inputImages.length,totalFile=container.length+ilength;
            if(totalFile>this.max){let e=[],i=this.max-ilength;for(let t=0;t<i;t++)e.push(container[t]);let m="The maximun number of file limit is "+this.max+" & we will remove the other files.";this.myAlert("File Limit Reached !",m,this.alertTimeout),container=e}
          }
          let valid=this.accept.map(e=>e.toString().replace("image/"," ")),jpeg=valid.some(e=>e.includes("jpeg"));jpeg&&(valid=valid.filter(e=>" jpeg"!=e.toString()));const imagesTypeInvalid=container.filter(e=>{var i;return!this.accept.includes(e.type)&&(this.myAlert("Invalid File Type !","We only allow "+valid+(jpeg?" & jpg":"")+".\n",this.alertTimeout),!0)});
          const imagesSize=container.filter(e=>{if(e.size>=maxsize)return!0});
          if(imagesSize.length>=1){this.myAlert("Exceed File Size!",`${imagesSize[0].name} size exceeds the maximun.We will remove all of exceed file.`,this.alertTimeout);for(let e=0;e<imagesSize.length;e++)container.remove(imagesSize[e])}
         
          if (imagesTypeInvalid.length > 0) {
            for (let i = 0; i < imagesTypeInvalid.length; i++) container.remove(imagesTypeInvalid[i]);
            return container;
          }
          return container;
        },
        imageDetect(e,drop){
          if(window.File&&window.FileList&&window.FileReader){if(0==this.inputImages.length){let i=[];i=e.target.files||e.dataTransfer.files,drop&&(i=e.dataTransfer.files),i=Array.prototype.slice.call(i);this.imageValidation(i,this.imageSize).map(i=>this.inputImages.push(i)),this.imagesLivePreview=this.inputImages;let s=[];this.inputImages.map(async i=>{this.resize?s.push(await this.global.fileResize(i,this.resize)):s.push(i),this.imagesRender=s,this.$emit("dataImage",this.imagesRender)})}else{let t=[];t=e.target.files||e.dataTransfer.files,drop&&(t=e.dataTransfer.files),t=Array.prototype.slice.call(t),(t=this.imageValidation(t,this.imageSize)).map(i=>this.inputImages.push(i)),this.imagesLivePreview=this.inputImages;let a=[];this.inputImages.map(async i=>{this.resize?a.push(await this.global.fileResize(i,this.resize)):a.push(i),this.imagesRender=a,this.$emit("dataImage",this.imagesRender)})}}else console.log("Your browser is not supports files format.");
        },
        clearProperty(){
          this.dataReset.clear&&(this.inputImages=[],this.imagesLivePreview=[],this.imagesRender=[],this.$emit("dataImage",this.imagesRender),this.dataReset.clear=!1);
        }
    },
    created(){
      this.dataReset&&(this.dataClear=this.dataReset),Array.prototype.remove=function(){for(var t,e,i=arguments,s=i.length;s&&this.length;)for(t=i[--s];-1!==(e=this.indexOf(t));)this.splice(e,1);return this};
    },
    mounted(){
      let blob=this.global.dataURItoBlob(this.img);this.$refs.camera.src=URL.createObjectURL(blob);
      this.$refs.zakerxaDragBox.addEventListener('dragleave', function(e){
        this.dragBoxStyle = false;
      }.bind(this));
    }
});

class ZakerxaImage {

  constructor(){
  }
  makeId(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) result += characters.charAt(Math.floor(Math.random() * charactersLength));
    return result;
  }
  fileResize(file,resize){
      return new Promise((resolve, reject) => {
        file?this.resizeImage(file,resize).then(e=>{let i=file.name;i.endsWith(".webp")||i.endsWith(".jpeg")?i=i.slice(0,-5):(i.endsWith(".png")||i.endsWith(".svg")||i.endsWith(".gif")||i.endsWith(".psd")||i.endsWith(".pdf"),i=i.slice(0,-4));let s=new File([e[0]],i+".jpg",{lastModified:new Date().getTime(),size:e[0].size,type:"image/jpeg"});resolve(s)}):reject(Error("No file detect"));
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
    const canvas=document.createElement("canvas");let[maxWidth,maxHeight]=[resize.w,resize.h],[imgWidth,imgHeight]=[image.naturalWidth,image.naturalHeight];const ratio=Math.min(maxWidth/imgWidth,maxHeight/imgHeight);let fw=imgWidth*ratio,fh=imgHeight*ratio;(resize.keepRatio??(resize.keepRatio=!1))||(fw=resize.w,fh=resize.h),canvas.width=fw,canvas.height=fh,canvas.getContext("2d").drawImage(image,0,0,fw,fh);const dataUrl=canvas.toDataURL("image/jpeg",1);
    return [this.dataURItoBlob(dataUrl),fw,fh];
  }
  resizeImage(file,resize){
    const reader = new FileReader();const image = new Image();
    return new Promise((a,e)=>{if(!file.type.match(/image.*/)){e(Error("Not an image"));return}reader.onload=e=>{image.onload=()=>a(this.reSize(image,resize)),image.src=e.target.result},reader.readAsDataURL(file)});
  }
}
</script>



<style scoped>
.closebtn,.delIcon,.file-select,.imgPreview,input[type=file]{cursor:pointer}.colc-4{width:33.33%}*{box-sizing:border-box}.rowc{display:table;border-radius:5px;padding-top:5px;-webkit-user-drag:none;user-select:none;-moz-user-select:none;-webkit-user-select:none;-ms-user-select:none}@media only screen and (max-width:476px){[class*=colc-]{display:inline;width:33.33%}}@media only screen and (min-width:476px) and (max-width:768px){[class*=colc-]{display:inline;width:25%}}@media only screen and (min-width:769px){[class*=colc-]{display:inline;width:20%}}.closebtn{margin-left:15px;color:#fff;font-weight:700;float:right;font-size:22px;line-height:20px;transition:.3s}.closebtn:hover{color:#000}.imghover{border:2px solid #dfd4d4;position:relative;display:inline-block}.imghover:hover{box-shadow:2px 2px 5px #4594e4;transition:.2s ease-in-out;-moz-transition:.2s ease-in-out;-webkit-transition:.2s ease-in-out;-o-transition:.2s ease-in-out}.zakerxa-upload{align-items:center;display:block;text-align:center;font-family:sans-serif;font-size:14px;position:relative;max-height:400px;width:100%}.file-select,.file-select-button{align-items:center;display:flex;position:relative}.file-select{border:2px solid #dce4ec;color:#243342;height:42px;border-radius:8px;text-align:left;background:#f8f8f8;overflow:hidden;width:100%}.file-select-button{height:100%;background:#dce4ec;padding:12px 5px 12px 14px;font-weight:700}.file-ready{padding:0 5px 0 10px}.file-image{width:27px}.zakerxa-upload-input,input[type=file]{height:100%;width:100%;top:0;opacity:0;left:0;position:absolute}.zakerxa-upload .file-select:hover{border-color:#80a3c5;transition:.3s ease-in-out;-moz-transition:.3s ease-in-out;-webkit-transition:.3s ease-in-out;-o-transition:.3s ease-in-out}.zakerxa-upload .file-select:hover .file-select-button{background:#65a5e6;transition:.2s ease-in-out;-moz-transition:.2s ease-in-out;-webkit-transition:.2s ease-in-out;-o-transition:.2s ease-in-out}.zakerxa-upload .file-select:hover .file-ready{background:#65a5e6;color:#f8f8f8;transition:.2s ease-in-out;-moz-transition:.2s ease-in-out;-webkit-transition:.2s ease-in-out;-o-transition:.2s ease-in-out}.zakerxa-upload-input{z-index:101}input[type=file]{z-index:100}.zakerxa-upload .file-select.file-select-disabled{opacity:.65}.zakerxa-upload .file-select.file-select-disabled:hover{display:block;border:2px solid #dce4ec;color:#34495e;cursor:pointer;height:40px;line-height:40px;margin-top:5px;text-align:left;background:#fff;overflow:hidden;position:relative}.zakerxa-upload .file-select.file-select-disabled:hover .file-select-button{background:#dce4ec;color:#666;padding:0 10px;display:inline-block;height:40px;line-height:40px}.zakerxa-upload .file-select.file-select-disabled:hover .file-select-name{line-height:40px;display:inline-block;padding:0 10px}.delIcon{position:absolute;display:inline-block;top:-2px;right:3px;font-size:18px;font-style:normal;font-weight:bolder;color:#e71414}.zakerxaMultipleImageAlertOverlay{position:fixed;display:flex;align-items:center;z-index:9999;top:0;bottom:0;left:0;right:0;background:rgba(0,0,0,.7);transition:opacity .5s;visibility:visible;opacity:1}.zakerxaMultipleImageAlertpopup{margin:70px auto;padding:20px;background:#fff;border-radius:5px;width:30%;position:relative;transition:.5s ease-in}.zakerxaMultipleImageAlertpopup h4{margin-top:0;color:#d55656;font-family:Tahoma,Arial,sans-serif}.zakerxaMultipleImageAlertpopup .close{position:absolute;top:3px;right:15px;transition:.2s;font-size:30px;font-weight:700;text-decoration:none;color:#333}.zakerxaMultipleImageAlertpopup .close:hover{color:#466ccd}.zakerxaMultipleImageAlertpopup .content{max-height:30%;overflow:auto}@media screen and (max-width:700px){.box,.zakerxaMultipleImageAlertpopup{width:80%}}
</style>

<<<<<<< HEAD
function r({initialHeight:t,shouldAutosize:i,state:s}){return{state:s,wrapperEl:null,init:function(){this.wrapperEl=this.$el.parentNode,this.setInitialHeight(),i?this.$watch("state",()=>{this.resize()}):this.setUpResizeObserver()},setInitialHeight:function(){this.$el.scrollHeight<=0||(this.wrapperEl.style.height=t+"rem")},resize:function(){if(this.setInitialHeight(),this.$el.scrollHeight<=0)return;let e=this.$el.scrollHeight+"px";this.wrapperEl.style.height!==e&&(this.wrapperEl.style.height=e)},setUpResizeObserver:function(){new ResizeObserver(()=>{this.wrapperEl.style.height=this.$el.style.height}).observe(this.$el)}}}export{r as default};
=======
function t({initialHeight:e}){return{init:function(){this.render()},render:function(){this.$el.scrollHeight>0&&(this.$el.style.height=e+"rem",this.$el.style.height=this.$el.scrollHeight+"px")}}}export{t as default};
>>>>>>> b2b2cf4189ef85c0e5dfea594b9c8d7fd0f7d831

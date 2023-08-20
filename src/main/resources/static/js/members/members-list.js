let newapp = Vue.createApp({
  components: {
		"paginate": VuejsPaginateNext
		
	},
  data: function () {
    return {
      //分頁 start
      start: 0, //server資料的起始位置
      rows: 3, //每頁最多幾筆
      current: 1, //目前分頁
      pages: 0, //最多需要幾個分頁
      lastPageRows: 0, //最後一頁有幾筆資料
      //分頁 end      
      findUserName:"",      
      validationMessage:"",

      //畫面顯示 start
      isShowSelect: false,
      showPaginate:false,
      showNoData:false,
      showAllMemberButton:false,
      showValidationMessage:false,

      memberItems: [],      
      contextPathVue:contextPath,
    };
  },
  computed: {    
  },
  methods: {
    // gotoViewAndEdit:function(){      
    //   window.location.href = contextPath+'/members/readedit';
    // },
	addMember:function(){
		window.location.href = contextPath+"/members/addmember";	
	},
    showAllMember:function(){
      this.showSelect();
      this.callFindAll(1);
    },
    findUserNameByLike: function () {      
      //輸入檢核
      this.validationMessage = '';
      if (typeof(this.findUserName) === 'undefined'||this.findUserName.trim()==='') {
        this.showValidationMessage = true;
        this.validationMessage = '請輸入帳號!';
        return false;
      }       
      //顯示控制
      this.showPaginate = false; 
      this.showAllMemberButton = true;
      
      //axios
      let request = {
        userName: this.findUserName,        
      };
      let vm = this;
      axios
        .post(contextPath + "/members/findusernamebylike", request)
        .then(function (response) {
          console.log("response=",response);
          let count = response.data.count;
          vm.memberItems = response.data.list;
          console.log("response.data=",response.data);
          
          vm.showNoData = (count===0 || vm.memberItems.length==0)

        })
        .catch(function (error) {
          console.error("資料請求失敗：", error);
        });
    },


    showSelect: function () {      
      this.isShowSelect = true;
    },
    callFindAll: function (page) {
      console.log("callFindAll_page_0", page);
      //顯示等待訊息：目前正在執行Server端程式
      bootbox.dialog({
        closeButton: false,
        message: '<div class="text-center">Loading...</div>',
      });

      //計算分頁所需要的資訊
      if (page) {
        this.start = (page - 1) * this.rows;
        this.current = page;        
      } else {
        this.start = 0;
        this.current = 1;        
      }      
      //呼叫Server端程式
      let vm = this;
      axios.get(contextPath + "/members/pages?pagenum=" + vm.current + "&rows=" + vm.rows+"&direction=desc&columnname=membersId").then(function (response) {
          console.log("callFindAll_response=", response);
          //顯示Server端程式執行結果：分頁程式、清空先前查詢結果、顯示查詢結果
          vm.memberItems = response.data.content;

          let count = response.data.totalElements;
          vm.pages = Math.ceil(count / vm.rows);
          vm.lastPageRows = count % vm.rows;
          
          //顯示無結果控制
          vm.showNoData = count === 0 || vm.memberItems.length == 0;
          console.log("callFindAll_response showNoData=", vm.showNoData);

          //分頁顯示
          vm.showPaginate = !vm.showNoData;
          console.log("callFindAll_response showPaginate=", vm.showPaginate);


          setTimeout(function () {
            bootbox.hideAll();
          }, 500);
        })
        .catch(function (error) {
          console.log("callFindAll error", error);
          bootbox.alert({
            message: "呼叫Server程式發生錯誤：" + error,
            buttons: {
              ok: {
                label: "關閉",
                className: "btn-danger",
              },
            },
            callback: function () {
              setTimeout(function () {
                bootbox.hideAll();
              }, 500);
            },
          });
        })
        .finally(function () {});
    },
  },
  mounted() {
    let dom = this;
    $(window).on("load", function () {
      dom.showSelect();
      dom.callFindAll();
    });
  },
}).mount("#app");

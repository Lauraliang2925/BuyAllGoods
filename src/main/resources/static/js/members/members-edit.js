let newapp = Vue.createApp({
	components: {},
	data: function() {
		return {
			
			imgSrcVue:"",
			editMembersId: membersId,
			contextPathVue: contextPath,
			
			componentKey:0,
		};
	},
	computed: {},
	methods: {			
		modifyMember:function(){
			console.log("modifyMember..in ");			
			let membersId = document.getElementById('membersId').value;
			let userName = document.getElementById('userName').value;
			let password = document.getElementById('password').value;
			let firstName = document.getElementById('firstName').value;
			let lastName = document.getElementById('lastName').value;
			let birthday = document.getElementById('birthday').value;
			let gender = document.getElementById('gender').value;
			let tel = document.getElementById('tel').value;
			let phoneNumber = document.getElementById('phoneNumber').value;
			let postalCode = document.getElementById('postalCode').value;
			let address = document.getElementById('address').value;
			let email = document.getElementById('email').value;
			let photoPath = document.getElementById('myImage').src;
			let role = document.getElementById('role').value;			
			let registrationDate = document.getElementById('registrationDate').value;
			let expirationDate = document.getElementById('expirationDate').value;
			
			let errorMsg="";			
			
			if(password===""){
				errorMsg = errorMsg + '<div class="text-left">請輸入密碼!</div>';				
			}
			if(firstName===""){
				errorMsg = errorMsg + '<div class="text-left">請輸入姓氏!</div>';				
			}
			if(lastName===""){
				errorMsg = errorMsg + '<div class="text-left">請輸入姓名!</div>';				
			}
			if(gender==="no"){
				errorMsg = errorMsg + '<div class="text-left">請選擇性別!</div>';				
			}
			if(tel===""){
				errorMsg = errorMsg + '<div class="text-left">請輸入電話!</div>';				
			}
			if(address===""){
				errorMsg = errorMsg + '<div class="text-left">請輸入地址!</div>';				
			}
			if(postalCode===""){
				errorMsg = errorMsg + '<div class="text-left">請輸入郵遞區號!</div>';				
			}
			if(email===""){
				errorMsg = errorMsg + '<div class="text-left">請輸入Email!</div>';				
			}
			if(role==="0"){
				errorMsg = errorMsg + '<div class="text-left">請選擇角色!</div>';				
			}
			
			if (errorMsg != '') {
				bootbox.alert({
                    message: errorMsg,
                    buttons: {
                        ok: {
                            label: '關閉',
                            className: 'btn btn-danger'
                        }
                    },
                    callback: function() {
                        setTimeout(function() {
                            bootbox.hideAll();
                        }, 500)
                    }
                })
				return false;
			}
			let request = {
                membersId: membersId,
				userName: userName,
				password: password,
				firstName: firstName,
				lastName: lastName,
				birthday: birthday,
				gender: gender,
				tel: tel,
				phoneNumber: phoneNumber,
				postalCode: postalCode,
				address: address,
				email: email,
				photoPath: photoPath,
				role: role,
				registrationDate: registrationDate,
				expirationDate: expirationDate
            }
            console.log("request=",request);
            
            let vm = this;
            axios.put(contextPath+"/members/modify/"+membersId, request).then(function(response) {
                if(response.data.success) {
                    bootbox.alert({
                        message: '<div class="text-center">'+response.data.message+'</div>',
                        buttons: {
                            ok: {
                                label: '關閉',
                                className: 'btn btn-success'
                            }
                        },
                        callback: function() {
                            //vm.closeMdify();
                            //vm.callFind(vm.current);
                            setTimeout(function() {
                                bootbox.hideAll();
                            }, 500)
                        }
                    })
                } else {
                    bootbox.alert({
                        message: '<div class="text-center">'+response.data.message+'</div>',
                        buttons: {
                            ok: {
                                label: '關閉',
                                className: 'btn btn-danger'
                            }
                        },
                        callback: function() {
                            setTimeout(function() {
                                bootbox.hideAll();
                            }, 500)
                        }
                    })
                }
            }).catch(function(error) {
                bootbox.alert({
                    message: '<div class="text-center">修改失敗：'+error+'</div>',
                    buttons: {
                        ok: {
                            label: '關閉',
                            className: 'btn btn-danger'
                        }
                    },
                    callback: function() {
                        setTimeout(function() {
                            bootbox.hideAll();
                        }, 500)
                    }
                })
            }).finally(function() {

            })
			console.log("modifyMember..End.. ");
			
			
			
			
			
		},		
		uploadFile: function() {						
			let selectFile = document.getElementById('selectFile');
			let oneFile = selectFile.files[0];
			console.log("uploadFile..file ", oneFile);

			if (typeof (oneFile) === 'undefined') {
				bootbox.alert({
                    message: '<div class="text-center">請選擇檔案!</div>',
                    buttons: {
                        ok: {
                            label: '關閉',
                            className: 'btn btn-danger'
                        }
                    },
                    callback: function() {
                        setTimeout(function() {
                            bootbox.hideAll();
                        }, 500)
                    }
                })
				return false;
			}
			
			//利用File物件產生上傳用的HTML Form資料
			let formData = new FormData();
			
			formData.append("file", oneFile);
			formData.append("editMembersId", this.editMembersId);

			let vm = this;

			axios.post(contextPath+"/members/single-file", formData, {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			}).then(function (response) {
				   console.log(response.data.success+" message:"+response.data.message);				   
				   		
				   if(response.data.success) {
					//上傳成功，client重新渲染	
                    bootbox.alert({
                        message: '<div class="text-center">'+response.data.message+'</div>',
                        buttons: {
                            ok: {
                                label: '關閉',
                                className: 'btn btn-success'
                            }
                        },
                        callback: function() {                            
                            setTimeout(function() {
                                bootbox.hideAll();
                            }, 500)
                        }
                    })
					//無用vm.imgSrcVue = contextPath+response.data					
					var imageElement = document.getElementById("myImage");
					let counter = 0;
                    let intervalObj = setInterval(function() {
						counter++;
					    console.log("Interval count:", counter);
						imageElement.src  = contextPath+response.data.photoPath;
					    imageElement.onload = function() {
          				  console.log("Image loaded successfully!");
            			  clearInterval(intervalObj);
        				};    
					}, 800);
					
					//清除原上傳檔案
					selectFile.value = "";
                    
                } else {
					//上傳失敗
                    bootbox.alert({
                        message: '<div class="text-center">'+response.data.message+'</div>',
                        buttons: {
                            ok: {
                                label: '關閉',
                                className: 'btn btn-danger'
                            }
                        },
                        callback: function() {
                            setTimeout(function() {
                                bootbox.hideAll();
                            }, 500)
                        }
                    })
                }
			}).catch(function (error) {
				alert(error);
			}).finally(function () {
				
			});			
		}


	},
	mounted() {
		let dom = this;
		$(window).on("load", function() {
			//畫面載入指定圖片
			dom.imgSrcVue = imgSrc;     			
			//console.log("mounted_dom.imgSrcVue=",dom.imgSrcVue)
		});
	},
}).mount("#app");

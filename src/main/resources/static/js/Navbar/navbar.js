function upadateLocalStoraage(){
    let storedJsonData = localStorage.getItem('count');
    if(storedJsonData === null || storedJsonData){
        axios.get('http://localhost:8080/buyallgoods/api/page/shoppingcarts/count/8')
        .then((response)=>{
            let cartCount = response.data
            updateCartBadge(cartCount);
            localStorage.setItem('count', cartCount);
        })
    }
}

function updateCartBadge(cartCount) {
    const cartBadge = document.getElementById('cart');
    if (cartBadge) {
        cartBadge.textContent = cartCount;
        localStorage.setItem('count', cartCount);
    }
}
upadateLocalStoraage();
// let test = document.getElementById('cart');
// if (test) {
//     test.textContent = storedJsonData;
// }
// console.log(storedJsonData)
// function getCount(){
//     axios.get('http://localhost:8080/buyallgoods/api/page/shoppingcarts/count/8')
//     .then((response)=>{
//         let storedJsonData = localStorage.getItem('count');
//         let cartCount = response.data
//         var cartBadge = document.getElementById('cart');
//         if(storedJsonData !== cartCount || cartBadge ){ 
//             localStorage.setItem('count', cartCount);
//             cartBadge.textContent = cartCount;
//             //getCount();
//         }
//     })
// }


//`${contextPath}api/page/shoppingcarts/count/${members_id}`
// 'http://localhost:8080/buyallgoods/api/page/shoppingcarts/count/8'


// let storedJsonData = localStorage.getItem('count');
// let storedcount = parseInt(storedJsonData) || 0; 

// // 获取用于显示 count 的元素
// let countElement = document.getElementById('cart');

// // 更新 count 的显示
// countElement.textContent = storedcount.toString();
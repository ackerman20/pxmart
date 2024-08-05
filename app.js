// Firebase 配置
const firebaseConfig = {
    apiKey: "AIzaSyCYJ891mFuTMr0hrBkUQO8vHBwEvDX7eUA",
    authDomain: "collections-27fed.firebaseapp.com",
    projectId: "collections-27fed",
    storageBucket: "collections-27fed.appspot.com",
    messagingSenderId: "168362219821",
    appId: "1:168362219821:web:5b8a59c03e69d77254dba4"
  };
  
// 初始化 Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// 查找商品位置功能
function searchProduct() {
  const productName = document.getElementById('productSearch').value.trim();
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = '';

  if (productName) {
    // 查詢商品名稱為 productName 的商品位置
    db.collection('collections').doc('A').collection('products')
      .where('name', '==', productName)
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.empty) {
          resultsDiv.innerHTML = '<p>找不到商品</p>';
        } else {
          querySnapshot.forEach((doc) => {
            const productData = doc.data();
            resultsDiv.innerHTML += `<p>${productData.name} 位於: ${productData.position}</p>`;
          });
        }
      })
      .catch((error) => {
        console.error('Error getting documents: ', error);
        resultsDiv.innerHTML = '<p>發生錯誤，請稍後再試</p>';
      });
  } else {
    resultsDiv.innerHTML = '<p>請輸入商品名稱</p>';
  }
}
    } else {
      resultsDiv.innerHTML = '<p>請輸入商品名稱</p>';
    }
  }
  

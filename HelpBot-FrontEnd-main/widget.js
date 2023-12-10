// Tạo một phần tử iframe
// code icon
// onClick. => {
// localStorage
// call api room:
// tạo room => room/id

// }
const iframe = document.createElement('iframe');
// Đặt các thuộc tính của iframe
// onClickIconChat. check roomId =>
iframe.src = 'http://127.0.0.1:3000/chatEmbed/?roomId=&?key=';
iframe.style.position = 'fixed';
iframe.style.bottom = '0';
iframe.style.right = '0';
iframe.style.width = '300px'; // Điều chỉnh kích thước của iframe tại đây
iframe.style.height = '500px'; // Điều chỉnh kích thước của iframe tại đây

// Thêm iframe vào body
document.body.appendChild(iframe);

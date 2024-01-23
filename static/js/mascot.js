// let message = 'This is a dynamic message';
// let popmessage = "HEy!"
// let html = generateMascot(message, popmessage);
// document.getElementById('yourElementId').innerHTML = html;

function generateMascot(message, popMessage, mascotNo) {
    html = generateMascotHTML(message, popMessage, mascotNo);
    document.getElementById("mascot").innerHTML = html;
  }
  
  function generateMascotHTML(message, popMessage, mascotNo) {
    return `
      <div class="mascot mascot-animation">
          <a title="mascot mascot-animation" href="#" onclick="popAlert('${popMessage}')">
              <img src="../static/img/mascot/${mascotNo}.png" alt="Mascot" width="100px" height="100px">
          </a>
          <div class="talk-bubble tri-left round right-in" height="100px" style="background-color: beige;">
              <div class="talktext">
                  <p>${message}</p>
              </div>
          </div>
      </div>
      `;
  }
  
  function popAlert(popmessage) {
    alert(popmessage);
  }
  
  function showMessageBasedOnPage() {
    let path = window.location.pathname;
    let message, popMessage;
    let homeMascot, pengajaranMascot, latihanMascot, kuizRightMascot, kuizWrongMascot
    let randNum
  
      homeMascot = 2
      pengajaranMascot = 6
      latihanMascot = 3
      kuizRightMascot = 8
      kuizWrongMascot = 4
      kuizMascot = 7
      profileMascot = 5
      randNum = Math.floor(Math.random() * 3)
  
    if (path === "/home") {
      message = ['Selamat Datang!', 'Bestnye Matematik!','Nombor adalah bahasa alam semesta'];
      popMessage = ['You terjumpa rahsia!','Matematik adalah subjek yang sangat istimewa!','Matematik sangat penting!'];
      mascotNo = homeMascot;
    } else if (path === "/kuizLeaderboard") {
      message = ['Wow!','Fuyoo!','Bijaknya!']
      popMessage = ['Hebat!','Fantastic!','Mesti bijak!']
      mascotNo = kuizMascot
  
    } else if (path === "/pengajaran") {
      message = ['Nak belajar apa hari ini?','Nak belajar apa hari ini?','Jom belajar!']
      popMessage = ['Pemfaktoran & Algebra?','Ukuran Asas?','mana-mana pun okay sahaja']
      mascotNo = pengajaranMascot
  
    } else if (path === "/ukuran_asas") {
      message = ['1m berapa cm?','1kg berapa g?','1 hari berapa jam?']
      popMessage = ['1000','1000','24']
      mascotNo = pengajaranMascot
  
    } else if (path === "/faktor_algebra") {
      message = ['2x + 2y boleh jadi apa?','2(x+y) bole diperkembangkan tak?','Susahnya algerbra :C']
      popMessage = ['2(x+y)','Boleh! Jadi 2x + 2y','Tapi kita belajar!']
      mascotNo = pengajaranMascot
  
    } else if (path === "/latihan") {
      message = ['Mari kita belajar!','Mari kita berlatih!','Jom berlatih!']
      popMessage = ['Kena fokus!','Kena fokus!','Kena fokus!']
      mascotNo = latihanMascot
  
    } else if (path === "/card_algebra") {
      message = ['Woah! Banyaknya!','Jom belajar pemfaktoran!','Jom belajar pembahagian!']
      popMessage = ['Kita boleh belajar ini!','Jom!!!!!','jom!!!!!']
      mascotNo = latihanMascot
  
    } else if (path === "/card_ukuran") {
      message = ['Woah! Banyaknya!','1 litre jadi 1000ml','1kg jadi 1000g']
      popMessage = ['Kita boleh belajar semua!','betul!','Bijak!']
      mascotNo = latihanMascot
  
    } else if (path === "/kuiz") {
      message = ['Adakah anda sedia?','Beranikah anda?','Dah cukup study?']
      popMessage = ['Jangan taku~','Mestilah berani!','Insyallah']
      mascotNo = kuizMascot
  
    } else if (path === "/kuizAlgE") {
      message = ['senang je!','benda tak susah pon!','siapa cepat dia dapat!']
      popMessage = ['semau kita jawab!','kita jawab semua!','llajuuu']
      mascotNo = kuizMascot
  
    } else if (path === "/kuizAlgM") {
      message = ['senang je!','benda tak susah pon!','siapa cepat dia dapat!']
      popMessage = ['semau kita jawab!','kita jawab semua!','llajuuu']
      mascotNo = kuizMascot
  
    } else if (path === "/kuizAlgH") {
      message = ['senang je!','benda tak susah pon!','siapa cepat dia dapat!']
      popMessage = ['semau kita jawab!','kita jawab semua!','llajuuu']
      mascotNo = kuizMascot
  
    } else if (path === "/kuizUnitE") {
      message = ['senang je!','benda tak susah pon!','siapa cepat dia dapat!']
      popMessage = ['semau kita jawab!','kita jawab semua!','llajuuu']
      mascotNo = kuizMascot
  
    } else if (path === "/kuizUnitM") {
      message = ['senang je!','benda tak susah pon!','siapa cepat dia dapat!']
      popMessage = ['semau kita jawab!','kita jawab semua!','llajuuu']
      mascotNo = kuizMascot
      
    } else if (path === "/kuizUnitH") {
      message = ['senang je!','benda tak susah pon!','siapa cepat dia dapat!']
      popMessage = ['semau kita jawab!','kita jawab semua!','llajuuu']
      mascotNo = kuizMascot
  
    } else if (path === "/profile") {
      message = ['Boleh tukar in sendiri!','Pilih gambar sendiri!','Tukar username jika mahu']
      popMessage = ['cuba la!','cuba la!','cuba la!']
      mascotNo = profileMascot
    }
  
  //   } else {
  //     message = ['','','']
  //     popMessage = ['','','']
  //     mascotNo =
  
  //   }
  
    let html = generateMascotHTML(message[randNum], popMessage[randNum], mascotNo);
    document.getElementById("mascot").innerHTML = html;
  }
  
  // Call the function when the page loads
  window.onload = showMessageBasedOnPage();
  
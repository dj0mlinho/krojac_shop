let db;
let template = $('[type="template"]').html();
let template2 = $('[type="secondTemplate"]').html();


$.ajax({
  url: "https://raw.githubusercontent.com/Danilovesovic/shop/master/shop.json",
  dataType: "json"
}).done(startApp);

function startApp(res) {
  db = res;
  render(db);
  $(".product-img-holder > a").on("click", showProduct);
  $(".gallery-mini > a").on("click", function () {
    event.preventDefault()
  });
  $(".back").on("click", function () {
    $(this).attr("href", "http://localhost/_projects/shop/");
  })

  document.getElementsByClassName("add-to-cart")[0].addEventListener("click", klik)


}

function render(colection) {
  let text = "";
  let text2 = "";
  let save = localStorage.getItem("save");
  save = save.replace("img/products/", "")
  save = save.replace(".jpg", "")


  for (let i = 0; i < colection.length; i++) {
    if (save == db[i].imgSrc) {
      text = template
        .replace(/{{imgSrc}}/gi, colection[i].imgSrc)
        .replace(/{{productTitle}}/gi, colection[i].productTitle)
        .replace(/{{model}}/gi, colection[i].model)
        .replace(/{{price}}/gi, colection[i].price);

      let col = db[i].colection;
      let arr = db.filter(function (element) {
        return element.colection === col;
      })

      for (let j = 0; j < 4; j++) {
        let rand = Math.floor(Math.random() * arr.length)
        text2 += template2
          .replace(/{{imgSrc}}/gi, arr[rand].imgSrc)
          .replace(/{{productTitle}}/gi, arr[rand].productTitle)
          .replace(/{{model}}/gi, arr[rand].model)
          .replace(/{{price}}/gi, arr[rand].price);
        arr.splice(rand, 1)
      }
    }
  }

  let text1 = `<section class="products-section">
        <h3 class="top-picked active">Izdvajamo</h3>
        <div class="row" id="insertTemplate2">`
  let text3 = ` </div>
      </section>`
  text = text + text1 + text2 + text3;
  $("#insertTemplate").html(text);
}

function showProduct() {
  let imgValue = $(this)
    .children()
    .attr("src");
  this.href = "http://localhost/_projects/shop/detailed.html";
  localStorage.setItem("save", imgValue);
  render(db)

}

function klik() {

  event.preventDefault();

  localStorage.setItem("korpa", ($('.img-responsive.center-block').attr("src")));
  let korpa = localStorage.getItem("korpa");
  console.log(korpa);


}
let db;
let template = $('[type = "template"]').html();


$.ajax({
  url: "https://raw.githubusercontent.com/Danilovesovic/shop/master/shop.json",
  dataType: "json"
}).done(startApp);

function startApp(res) {
  db = res;
  render(db);

}

function render(colection) {
  let text = "";
  let save = localStorage.getItem("save");
  for (let i = 0; i < colection.length; i++) {
    if (save.indexOf(db[i].imgSrc) > -1) {
      text = template
        .replace(/{{imgSrc}}/gi, colection[i].imgSrc)
        .replace(/{{productTitle}}/gi, colection[i].productTitle)
        .replace(/{{model}}/gi, colection[i].model)
        .replace(/{{price}}/gi, colection[i].price);
    }
  }
  $("#insertTemplate").html(text);
}
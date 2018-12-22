let db;
let template = $('[type = "template"]').html();

$.ajax({
  url: "https://raw.githubusercontent.com/Danilovesovic/shop/master/shop.json",
  dataType: "json"
}).done(startApp);

function startApp(res) {
  db = res;
  render(db);

  $("[data-col]").on("click", displayCategory);
  $(".product-img-holder > a").on("click", showProduct);
}

function displayCategory() {
  event.preventDefault();
  let dataCol = $(this).data("col");

  let colection = db.filter(function(element) {
    return element.colection == dataCol || element[dataCol];
  });
  render(colection);
}

function render(colection) {
  let text = "";
  for (let i = 0; i < colection.length; i++) {
    text += template
      .replace(/{{imgSrc}}/gi, colection[i].imgSrc)
      .replace(/{{productTitle}}/gi, colection[i].productTitle)
      .replace(/{{model}}/gi, colection[i].model)
      .replace(/{{price}}/gi, colection[i].price);
  }
  $("#insertTemplate").html(text);
}

function showProduct() {
  let imgValue = $(this)
    .children()
    .attr("src");
  this.href = "http://localhost/_projects/shop/detailed.html";
  localStorage.setItem("save", imgValue);
}

//BOJANOVO

$(".back-to-top").click(function() {
  $("html, body").animate(
    {
      scrollTop: 0
    },
    1000
  );
});

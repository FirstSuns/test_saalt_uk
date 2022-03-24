/**
 * Include your custom JavaScript here.
 *
 * We also offer some hooks so you can plug your own logic. For instance, if you want to be notified when the variant
 * changes on product page, you can attach a listener to the document:
 *
 * document.addEventListener('variant:changed', function(event) {
 *   var variant = event.detail.variant; // Gives you access to the whole variant details
 * });
 *
 * You can also add a listener whenever a product is added to the cart:
 *
 * document.addEventListener('product:added', function(event) {
 *   var variant = event.detail.variant; // Get the variant that was added
 *   var quantity = event.detail.quantity; // Get the quantity that was added
 * });
 *
 * If you just want to force refresh the mini-cart without adding a specific product, you can trigger the event
 * "cart:refresh" in a similar way (in that case, passing the quantity is not necessary):
 *
 * document.documentElement.dispatchEvent(new CustomEvent('cart:refresh', {
 *   bubbles: true
 * }));
 */

/* ==================================================
Form swapper:

Swap out displayed form with animation depending
on select menu option
===================================================*/
function updateVisibleForm() {
    var e = `[data-id="${$("#contact-option").val()}"]`;
    $(".form-swap-section").removeClass("visible open");
    $(e).addClass("visible");
    // setTimeout(function() {
    //     $(e).addClass("open");
    // }, 20);
}

if (location.pathname === '/pages/contact-us') {
    $(document).ready(function() {
        $("#contact-option").change(function() {
            updateVisibleForm();
        });
    });
}

var displayMailChimpStatus = function (e) {
  if (e.result && e.msg) {
  	var t = document.querySelector('.mc-message');
    if ('success' == e.result) {
    	t.previousElementSibling.style.display = 'none';
        t.previousElementSibling.style.visibility = 'hidden';
      	t.innerHTML = e.msg;
      	t.setAttribute('tabindex', '-1');
      	t.focus();
    }
    if('error' === e.result) {
      	t.classList.remove('success-message');
       	t.classList.add('error-message');
        t.innerHTML = "Looks like you're already subscribed!";
        // t.classList.remove('error-message');
        // t.classList.add('success-message');
    }
  }
};

var e = function(e) {
	var i = e.getAttribute('action');
    i = i.replace('/post?u=', '/post-json?u=');
    i += t(e) + '&c=displayMailChimpStatus';
    var n = window.document.createElement('script');
    n.src = i;
    var o = window.document.getElementsByTagName('script')[0];
    o.parentNode.insertBefore(n, o),
		n.onload = function() {
		this.remove()
    }
};

var t = function(e) {
    var t = '';
    for (i = 0; i < e.elements.length; i++) {
      var n = e.elements[i];
      n.name && !n.disabled && 'file' !== n.type && 'reset' !== n.type && 'submit' !== n.type && 'button' !== n.type && ('checkbox' !== n.type && 'radio' !== n.type || n.checked) && (t += '&' + encodeURIComponent(n.name) + '=' + encodeURIComponent(n.value))
    }
    return t
};


var wasteCalculatorSubmitted = false;
var wasteCalculatorAge = 0;

function wasteCalculation(e) {
    const ageInput= document.getElementById("waste-calculator-age");
    const ageValue= ageInput.value;
    const result = calculateWaste(ageValue);
    displayWasteCalculatorResults(result);
    e.preventDefault();
}

function calculateWaste(e) {
    var t = 390 * (53 - e)
      , i = 89.7 * (53 - e);
    return {
        itemsSaved: t,
        moneySaved: i
    }
}

function displayWasteCalculatorResults(e) {
    var t = ($('#waste-calculator-form button[type="submit"]'),
    $("#waste-calculator-input"))
      , i = $("#waste-calculator-results")
      , n = $("#waste-calculator-result-products-saved")
      , o = $("#waste-calculator-result-money-saved");
    t.css("display", "none"),
    i.fadeIn("fast", function() {
        n.html(e.itemsSaved),
        o.html(e.moneySaved),
        $(".waste-calculator-result-number").each(function() {
            $(this).prop("Counter", 0).animate({
                Counter: $(this).text()
            }, {
                duration: 1500,
                easing: "swing",
                step: function(e) {
                    "currency" == $(this).data("format") ? $(this).text(Math.ceil(e).toLocaleString("en", {
                        style: "currency",
                        currency: "USD"
                    })) : $(this).text(Math.ceil(e).toLocaleString("en"))
                }
            })
        })
    })
}

function impactTabIcons() {
  var counter;
  $(".shogun-tab").each(function(index) {
    if (index === 0 || index === 3) {
      $(this).find('span').html('<img class="tab-image" src="https://cdn.shopify.com/s/files/1/0294/4080/2921/files/Artboard_38_2x_739afb05-6b37-4409-a184-e62e4374e2ff.png?v=1612993871" />')
    } else if (index === 1 || index === 4 ) {
      $(this).find('span').html('<img class="tab-image" src="https://cdn.shopify.com/s/files/1/0294/4080/2921/files/Artboard_40_2x_b522f588-d04e-4416-b291-e4dd7978731f.png?v=1612993871" />')
    } else {
      $(this).find('span').html('<img class="tab-image" src="https://cdn.shopify.com/s/files/1/0294/4080/2921/files/Artboard_39_2x_102c481b-eda3-4df1-a3e6-5e2a3b40339b.png?v=1612993871" />');
    }
  });
}

function displayImpactStats() {
  var w = $("#waste-diverted"),
    c = $("#cups-donated"),
    p = $("#periods-served"),
    d = $("#dollars-saved"),
    cl = $("#cleanup-funded"),
    s = $("#school-funded");
  $(".impact-cols").fadeIn("fast", function() {
        w.html(4905585),
        c.html(27659),
        p.html(97080),
        d.html(272310),
        cl.html(15680),
        s.html(100400),
      $(".impact-stat-number").each(function() {
          console.log($(this).html);
          $(this).prop("Counter", 0).animate({
              Counter: $(this).text()
          }, {
              duration: 2500,
              easing: "swing",
              step: function(e) {
                  "currency" == $(this).data("format") ? $(this).text(Math.ceil(e).toLocaleString("en", {
                      style: "currency",
                      currency: "USD"
                  })) : $(this).text(Math.ceil(e).toLocaleString("en"))
              }
          });
      });
  });
  // Mobile Product Image Slider
}

if (location.pathname === '/pages/impact') {
  impactTabIcons();
  console.log($('#impact-columns').offset().top - 600);
  $(document).on('scroll.impactColumnsTrigger', function() {
    if ($(this).scrollTop() >= ($('#impact-columns').offset().top - 600)) {

        displayImpactStats();

        $(document).off('scroll.impactColumnsTrigger')
    }
  })
}

$('#waste-calculator-share-results-button').click(function(e) {
  e.preventDefault();
  var wasteCalculatorShareResults = calculateWaste(wasteCalculatorAge);
  FB.ui({
    display: 'popup',
    method: 'share',
    href: 'https://saalt.com/pages/waste-calculator',
    quote: `Humble brag - by switching to the Saalt Cup I'll save ${wasteCalculatorShareResults.moneySaved.toLocaleString("en", { style: 'currency', currency: 'USD' })} and divert ${wasteCalculatorShareResults.itemsSaved.toLocaleString("en")} period products from landfills. Try this waste calculator to see how you can reduce your period print. Cheers!`
  }, function(response){});
});

$(function() {
    $('.quiz-result-product, .quiz-result-cup-variant-add').click(function(e) {
      e.preventDefault();
      addQuizItemToCart(e.target.dataset.variantId);
  });
});

function addQuizItemToCart(variant_id) {
  data = {
    "id": variant_id,
    "quantity": 1
  }

  jQuery.ajax({
    type: 'POST',
    url: '/cart/add.js',
    data: data,
    dataType: 'json',
    success: function() {
      console.log(data);
        document.documentElement.dispatchEvent(new CustomEvent('cart:refresh', {
            bubbles: true
        }));
    }
  });
  document.documentElement.dispatchEvent(new CustomEvent('cart:refresh', {
    bubbles: true
  }));
}

$(function() {
  $('.quiz-result-variant-selector').change(function(e) {
    var quizResultParentSelectorData = $(this).data('parentSelector')
    var quizResultSelector = 'product-select-' + quizResultParentSelectorData;
    var quizresultVariant1 = $('.quiz-result-variant-option-1[data-parent-selector="' + quizResultParentSelectorData + '"]').val();
    var quizresultVariant2 = $('.quiz-result-variant-option-2[data-parent-selector="' + quizResultParentSelectorData + '"]').val();
    var variantSelected = $('#' + quizResultSelector);
    var variantSelectedOptions = $('#' + quizResultSelector + ' option');

    variantSelectedOptions.each(function(index, item) {
      if(item.text == (quizresultVariant1 + ' / ' + quizresultVariant2) || (item.text == quizresultVariant1) && !quizresultVariant2) {
        $(this).attr('selected', 'selected');
        variantSelected.prop('selectedIndex', $(this).index())
        variantSelected.trigger('change');
        return false;
      }
    })
  })

  
  $('.cup-quiz-product-add').click(function(e) {
    e.preventDefault();
    var quizResultVariantToAdd = $('#' + e.target.dataset.parentVariantForm + ' select[name=variant-id]').val();
    addQuizItemToCart(quizResultVariantToAdd)
  })

});
$(document).ready(function() {
  $('.cstm_curr_hm').click(function() {
    $("ul.currency").toggleClass("dropdown_cls");
    })
});
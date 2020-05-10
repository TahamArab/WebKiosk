$(document).ready(function () {

    const tickets = [
        {id: "1", ticketName: "بانجی جامپینگ1", ticketPrice: 50000},
        {id: "2", ticketName: "بانجی جامپینگ2", ticketPrice: 50000},
        {id: "3", ticketName: "بانجی جامپینگ3", ticketPrice: 50000},
        {id: "4", ticketName: "بانجی جامپینگ4", ticketPrice: 50000},
        {id: "5", ticketName: "بانجی جامپینگ5", ticketPrice: 50000},
        {id: "6", ticketName: "بانجی جامپینگ6", ticketPrice: 50000},
        {id: "7", ticketName: "بانجی جامپینگ7", ticketPrice: 50000},
        {id: "8", ticketName: "بانجی جامپینگ8", ticketPrice: 50000}
    ];

    if ($(".cardBody").length < 4) {
        $(".hold-factor").addClass("height80");
    }

    $("body").off('click', '.modalImages img', () => {
    }).on('click', '.modalImages img', function () {
        $(this).toggleClass('active');
    });

    $("body").off('click', '.detailCard', () => {
    }).on('click', '.detailCard', function () {
        /*let srcImage = $(this).parents(".card-contentBody").find(".cardImage img").attr("src");
        $(".modalDetailCard").find(".modalImages img").attr("src", srcImage);*/
        openModal();
    });

    $("body").off('click', '.closeModal', () => {
    }).on('click', '.closeModal', function () {
        closeModal();
    });

    function openModal() {
        $(".modalDetailCard").removeClass("outModal");
        $(".modalDetailCard").addClass("inModal");

        $(".backDark").removeClass("outOp");
        $(".backDark").addClass("inOp");

        $(".backDark").toggleClass("display-none", "display-block");
        $(".modalDetailCard").toggleClass("display-none", "display-block");
    }

    function closeModal() {
        setTimeout(() => {
            $(".backDark").toggleClass("display-none", "display-block");
            $(".modalDetailCard").toggleClass("display-none", "display-block");
        }, 380);
        $(".modalDetailCard").removeClass("inModal");
        $(".modalDetailCard").addClass("outModal");

        $(".backDark").removeClass("inOp");
        $(".backDark").addClass("outOp");
    }

    $("body").off('click', '.transfer-type label', () => {
    }).on('click', '.transfer-type label', function () {
        $(".transfer-type label").removeClass("active");
        $(this).addClass("active");
    });

    var curInputBox = null;
    let inputboxx = "";
    $("body").off('click', '.codeInputBox', () => {
    }).on('click', '.codeInputBox', function () {
        let inputbox = $(this);
        curInputBox = inputbox;
        inputboxx = inputbox;
        return false;
    });

    $("body").off('click', '.hold-keypad .char', () => {
    }).on('click', '.hold-keypad .char', function () {
        if (!curInputBox) {
            return;
        }
        var charklicked = $(this).html();
        var charClick = curInputBox.val();
        curInputBox.val(charClick + charklicked);
    });

    $("body").off('click', '.cleanInput', () => {
    }).on('click', '.cleanInput', function () {
        inputboxx.val("");
    });

    var Price = $(".priceVahed").html();
    let finalFac = [];
    //var Discount = 0;
    var countBlit = 0;
    var FinPrice = 0;
    //$(".discount").html(moneyFormat(Discount) + "تومان");

    $("body").off('click', '.factor-plus', () => {
    }).on('click', '.factor-plus', function () {
        let thisCard = $(this).parents(".factor-list").val();
        FinPrice = 0;
        var s = $(this).parents('.factor-list').find('.factorNumber span');
        let Parse = parseInt(s.text());
        s.text(++Parse);

        let idCardString = $(".cardBody");
        let myFactorIdDelete = $(this).parents('.factor-list').val();

        for (let i = 0; i < idCardString.length; i++) {
            let idCardFound = idCardString[i];
            let idCardConvert = $(idCardFound).find('input[type = hidden]').val();
            let idCardInt = parseInt(idCardConvert);
            if (myFactorIdDelete === idCardInt) {
                $(idCardFound).find(".TedadBlit").html(Parse);
            }
        }
        if (Parse >= 1) {
            /*var EachCard = $($this).parents(".cardBody").find(".allPrice").html(KolFormat + "تومان");**/
        } else {
            return false;
        }
        if (Parse >= 1) {
            $(this).parents('.factor-list').find('.factor-minus').removeAttr('disabled');

            for (let i = 0; i < idCardString.length; i++) {
                let idCardFound = idCardString[i];
                let idCardConvert = $(idCardFound).find('input[type = hidden]').val();
                let idCardInt = parseInt(idCardConvert);
                if (myFactorIdDelete === idCardInt) {
                    $(idCardFound).find(".minus").removeAttr('disabled');
                }
            }
        } else {
            $(this).parents('.factor-list').find('.factor-minus').attr('disabled');
            for (let i = 0; i < idCardString.length; i++) {
                let idCardFound = idCardString[i];
                let idCardConvert = $(idCardFound).find('input[type = hidden]').val();
                let idCardInt = parseInt(idCardConvert);
                if (myFactorIdDelete === idCardInt) {
                    $(idCardFound).find(".minus").attr('disabled');
                }
            }
        }
        let ticketFilter = tickets.filter(p => p.id == thisCard);
        let ticketIndex = finalFac.findIndex(p => p.ticketName === ticketFilter[0].ticketName);
        if (ticketIndex !== -1) {
            finalFac[ticketIndex].count = Parse;
        } else {
            finalFac.push({
                ticketName: ticketFilter[0].ticketName,
                ticketPrice: ticketFilter[0].ticketPrice,
                count: Parse,
                id: thisCard
            })
        }
        let facHtml = "";

        finalFac.map(res => {
            facHtml += Generate(res.ticketName, res.count, res.ticketPrice, res.id);
            var countParse = parseInt(res.count);
            var priceParse = parseInt(res.ticketPrice);
            FinPrice += countParse * priceParse;
        });
        $(".detailFactor ul").html(facHtml);
        $(".body-lastFactor ul").html(facHtml);

        //FinalPrice = FinPrice - Discount;
        $(".FinPrice").html(moneyFormat(FinPrice));
        $(".creditFactor").find('span').html(moneyFormat(FinPrice));
        $(".total-price-lastFactor").find('span').html(moneyFormat(FinPrice));
        $(".get-card-page-price").find('span').html(moneyFormat(FinPrice));
    });

    $("body").off('click', '.factor-minus', () => {
    }).on('click', '.factor-minus', function () {
        let thisCard = $(this).parents(".factor-list").val();
        FinPrice = 0;
        var s = $(this).parents('.factor-list').find('.factorNumber span');
        let Parse = parseInt(s.text());
        s.text(--Parse);

        let idCardString = $(".cardBody");
        let myFactorIdDelete = $(this).parents('.factor-list').val();

        for (let i = 0; i < idCardString.length; i++) {
            let idCardFound = idCardString[i];
            let idCardConvert = $(idCardFound).find('input[type = hidden]').val();
            let idCardInt = parseInt(idCardConvert);
            if (myFactorIdDelete === idCardInt) {
                $(idCardFound).find(".TedadBlit").html(Parse);
            }
        }
        $(".countBlit").html(--countBlit);
        if (Parse >= 1) {
            $(this).removeAttr('disabled');
            for (let i = 0; i < idCardString.length; i++) {
                let idCardFound = idCardString[i];
                let idCardConvert = $(idCardFound).find('input[type = hidden]').val();
                let idCardInt = parseInt(idCardConvert);
                if (myFactorIdDelete === idCardInt) {
                    $(idCardFound).find(".minus").removeAttr('disabled');
                }
            }
        } else {
            $(this).attr('disabled', 'disabled');
            for (let i = 0; i < idCardString.length; i++) {
                let idCardFound = idCardString[i];
                let idCardConvert = $(idCardFound).find('input[type = hidden]').val();
                let idCardInt = parseInt(idCardConvert);
                if (myFactorIdDelete === idCardInt) {
                    $(idCardFound).find(".minus").attr('disabled', 'disabled');
                }
            }
        }
        let ticketFilter = tickets.filter(p => p.id == thisCard);
        let ticketIndex = finalFac.findIndex(p => p.ticketName === ticketFilter[0].ticketName);
        if (ticketIndex !== -1) {
            finalFac[ticketIndex].count = Parse;
        } else {
            finalFac.push({
                ticketName: ticketFilter[0].ticketName,
                ticketPrice: ticketFilter[0].ticketPrice,
                count: Parse,
                id: thisCard
            })
        }
        let facHtml = "";
        finalFac.map(res => {
            facHtml += Generate(res.ticketName, res.count, res.ticketPrice, res.id);
            var countParse = parseInt(res.count);
            var priceParse = parseInt(res.ticketPrice);
            FinPrice += countParse * priceParse;
        });
        $(".detailFactor ul").html(facHtml);
        $(".body-lastFactor ul").html(facHtml);

        $(".FinPrice").html(moneyFormat(FinPrice));
        $(".creditFactor").find('span').html(moneyFormat(FinPrice));
        $(".total-price-lastFactor").find('span').html(moneyFormat(FinPrice));
        $(".get-card-page-price").find('span').html(moneyFormat(FinPrice));
    });

    $("body").off('click', '.ContentBody .plus', () => {
    }).on('click', '.ContentBody .plus', function () {
        let thisCard = $(this).parents(".ContentBody").find('input[type = hidden]').val();
        FinPrice = 0;
        var s = $(this).parents('.ContentBody').find('.numberCard .TedadBlit');
        let Parse = parseInt(s.text());
        s.text(++Parse);
        if (Parse >= 1) {
            /*var EachCard = $($this).parents(".cardBody").find(".allPrice").html(KolFormat + "تومان");**/
        } else {
            return false;
        }
        if (Parse >= 1) {
            $(this).parents('.ContentBody').find('.minus').removeAttr('disabled');
        } else {
            $(this).parents('.ContentBody').find('.minus').attr('disabled');
        }

        let ticketFilter = tickets.filter(p => p.id === thisCard);
        let ticketIndex = finalFac.findIndex(p => p.ticketName === ticketFilter[0].ticketName);
        if (ticketIndex != -1) {
            finalFac[ticketIndex].count = Parse;
        } else {
            finalFac.push({
                ticketName: ticketFilter[0].ticketName,
                ticketPrice: ticketFilter[0].ticketPrice,
                count: Parse,
                id: thisCard
            })
        }
        let facHtml = "";

        finalFac.map(res => {
            facHtml += Generate(res.ticketName, res.count, res.ticketPrice, res.id);
            var countParse = parseInt(res.count);
            var priceParse = parseInt(res.ticketPrice);
            FinPrice += countParse * priceParse;
        });
        $(".detailFactor ul").html(facHtml);
        $(".body-lastFactor ul").html(facHtml);
        //FinalPrice = FinPrice - Discount;
        $(".FinPrice").html(moneyFormat(FinPrice));
        $(".creditFactor").find('span').html(moneyFormat(FinPrice));
        $(".total-price-lastFactor").find('span').html(moneyFormat(FinPrice));
        $(".get-card-page-price").find('span').html(moneyFormat(FinPrice));
    });

    $("body").off('click', '.ContentBody .minus', () => {
    }).on('click', '.ContentBody .minus', function () {
        let thisCard = $(this).parents(".button-buy-card").find('input[type = hidden]').val();
        FinPrice = 0;
        var s = $(this).parents('.ContentBody').find('.numberCard .TedadBlit');
        let Parse = parseInt(s.text());
        s.text(--Parse);

        $(".countBlit").html(--countBlit);
        if (Parse >= 1) {
            $(this).removeAttr('disabled');
        } else {
            $(this).attr('disabled', 'disabled');
        }

        let ticketFilter = tickets.filter(p => p.id === thisCard);
        let ticketIndex = finalFac.findIndex(p => p.ticketName === ticketFilter[0].ticketName);
        if (ticketIndex != -1) {
            finalFac[ticketIndex].count = Parse;
        } else {
            finalFac.push({
                ticketName: ticketFilter[0].ticketName,
                ticketPrice: ticketFilter[0].ticketPrice,
                count: Parse,
                id: thisCard
            })
        }
        let facHtml = "";
        finalFac.map(res => {
            facHtml += Generate(res.ticketName, res.count, res.ticketPrice, res.id);
            var countParse = parseInt(res.count);
            var priceParse = parseInt(res.ticketPrice);
            FinPrice += countParse * priceParse;
        });
        $(".detailFactor ul").html(facHtml);
        $(".body-lastFactor ul").html(facHtml);

        $(".FinPrice").html(moneyFormat(FinPrice));
        $(".creditFactor").find('span').html(moneyFormat(FinPrice));
        $(".total-price-lastFactor").find('span').html(moneyFormat(FinPrice));
        $(".get-card-page-price").find('span').html(moneyFormat(FinPrice));
    });

    $("body").off('click', '.btn-delete-fac', () => {
    }).on('click', '.btn-delete-fac', function () {
        let myFactorNameDelete = $(this).parents('.factor-list').find('.factorName').html();
        let myFactorPriceDelete = $(this).parents('.factor-list').find('input[type = hidden]').val();
        let myFactorCountDelete = $(this).parents('.factor-list').find('.factorNumber span').html();
        let myFactorIdDelete = $(this).parents('.factor-list').val();
        let idCardString = $(".cardBody");
        FinPrice = 0;


        for (let i = 0; i < idCardString.length; i++) {
            let idCardFound = idCardString[i];
            let idCardConvert = $(idCardFound).find('input[type = hidden]').val();
            let idCardInt = parseInt(idCardConvert);
            if (myFactorIdDelete === idCardInt) {
                $(idCardFound).find(".TedadBlit").html("0");
            }
        }
        let DeleteFactor = finalFac.filter(p => p.ticketName !== myFactorNameDelete);
        let removeFactorList = $(this).parents(".factor-list");
        let facHtml = "";
        finalFac = DeleteFactor;
        finalFac.map(res => {
            facHtml += Generate(res.ticketName, res.count, res.ticketPrice, res.id);
            var countParse = parseInt(res.count);
            var priceParse = parseInt(res.ticketPrice);
            FinPrice += countParse * priceParse;
        });

        $(".detailFactor ul").html(facHtml);
        $(".body-lastFactor ul").html(facHtml);

        $(".FinPrice").html(moneyFormat(FinPrice));
        $(".creditFactor").find('span').html(moneyFormat(FinPrice));
        $(".total-price-lastFactor").find('span').html(moneyFormat(FinPrice));
        $(".get-card-page-price").find('span').html(moneyFormat(FinPrice));
    });

    $("body").off('click', '.resetForm', () => {
    }).on('click', '.resetForm', function () {
        location.reload();
    });

    function Generate(fName, fCount, fPrice, id) {
        if (fCount >= 1) {
            return `
                <li class="col-lg-12 col-md-12 col-sm-12 col-xs-12 factor-list" value='${id}'>
                    <input type="hidden" value='${fPrice}' >
                    <div class="factorCard fa">
                        <div class="factorHead">
                            <h5 class="factorName">${fName}</h5>
                        </div>
                        <div class="tedad-price">
                            <!--قیمت-->
                            <span class="factorPrice"><span>${moneyFormat(fPrice * fCount)}</span> تومان</span>
                        </div>
                        <div class="controlNumberFactor flex-row">
                            <button type="button" class="factor-plus">+</button>
                            <div class="factorNumber"><span>${fCount}</span> عدد</div>
                            <button type="button" class="factor-minus">--</button>
                        </div>
                        <div>
                            <button type="button" class="btn btn-delete-fac" ><svg height="12px" viewBox="0 0 329.26933 329" width="12px" xmlns="http://www.w3.org/2000/svg"><g fill="#f44336"><path d="m21.339844 329.398438c-5.460938 0-10.925782-2.089844-15.082032-6.25-8.34375-8.339844-8.34375-21.824219 0-30.164063l286.589844-286.59375c8.339844-8.339844 21.824219-8.339844 30.164063 0 8.34375 8.339844 8.34375 21.824219 0 30.164063l-286.589844 286.59375c-4.183594 4.179687-9.621094 6.25-15.082031 6.25zm0 0"/><path d="m307.929688 329.398438c-5.460938 0-10.921876-2.089844-15.082032-6.25l-286.589844-286.59375c-8.34375-8.339844-8.34375-21.824219 0-30.164063 8.339844-8.339844 21.820313-8.339844 30.164063 0l286.589844 286.59375c8.34375 8.339844 8.34375 21.824219 0 30.164063-4.160157 4.179687-9.621094 6.25-15.082031 6.25zm0 0"/></g></svg></button>
                        </div>
                    </div>
                </li>
        `;
        } else {
            return ``;
        }
    }


    let heightPaydiv = $(".paydiv").height();
    $(".detailFactor").css('height', 'calc(100% - '+ heightPaydiv +'px)');
    $("body").off('click', '.submitInputs button', () => {
    }).on('click', '.submitInputs button', function () {
        let FirstCode = $("#firstInput").val();
        let LastCode = $("#secondInput").val();
        let transferCount = 5;
        if ((FirstCode && LastCode) === "") {
            $(".yourDetail").addClass("display-none");
            setTimeout( () => {
                let heightFactor = $(".factor-tools").height();
                $(".detailFactor").css('height', 'calc(100% - '+ heightPaydiv +'px)');
            },10)
        } else {
            $(".yourDetail").removeClass("display-none");

            $(".yourLeaderyName").html("طاها عرب");
            $(".yourMaxTransfer").html("حداکثر مسافر " + transferCount + " نفر");
            $(".detailFactor").addClass("height68");
            setTimeout( () => {
                let heightFactor = $(".factor-tools").height();
                $(".detailFactor").css('height', 'calc(100% - '+ heightFactor +'px - '+ heightPaydiv +'px)');
            },10)
        }
    });

    var timeOut = undefined;
    $(document).on('click', function () {
        clearTimeout(timeOut);
        timeOut = setTimeout(function () {
            location.reload();
        }, 300000);
    });

    var currentTab = 0;
    $("body").off('click', '.nextTab', () => {
    }).on('click', '.nextTab', function () {
        let n = parseInt($(this).val());
        var x = $(".tab");
        x[currentTab].style.display = "none";
        x[currentTab].classList.remove("activeTab");
        currentTab = currentTab + n;
        if (currentTab >= x.length) {
            $("#regForm").submit();
            return false;
        }
        showTab(currentTab);
    });

    function showTab(n) {
        var x = $(".tab");
        x[n].style.display = "block";
        x[n].classList += " activeTab";
        if ($(x[4]).hasClass("activeTab")) {
            $("#navBar").find('button').val("-2");
        } else if ($(x[0]).hasClass("activeTab")) {
            $("#navBar").find('button').val("0");
        } else {
            $("#navBar").find('button').val("-1");
        }
        if (n == 0) {
            $("#prevBtn").style.display = "none";
        } else {
            $("#prevBtn").style.display = "inline";
        }
        if (n == (x.length - 1)) {
            $("#nextBtn").innerHTML = "Submit";
        } else {
            $("#nextBtn").innerHTML = "Next";
        }
        //fixStepIndicator(n)
    }

    showTab(currentTab);

    moneyFormat(Price);

    function moneyFormat(Price) {
        let finalPrice = [];
        let virtualPrice;
        let i = (Price + "").length;
        while (true) {
            virtualPrice = (Price + "").substring(i - 3, i);
            i -= 3;
            if (virtualPrice !== "")
                finalPrice.push(virtualPrice);
            else
                break;
        }
        return finalPrice.reverse().join(",").trim(",");
    }

    $(".priceVahed").html(moneyFormat(Price));
    $("body").off('click', '.transfer-type label', () => {
    }).on('click', '.transfer-type label', function () {
        $(".transfer-type").find('label').removeClass("active");
        $(this).addClass("active");
    });
});
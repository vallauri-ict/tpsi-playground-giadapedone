
$(document).ready(function() {
    body = $("body");
    var mapDiv = $("#map");
    //1 PASSO. CREAZIONE DEI QUATTRO DIV CHE CONTERRANNO LE LAMPADINE
    for (let i = 0; i < 4; i++) {
        let lamp = $("<div></div>");
        lamp.addClass("lamp lampOff");
        lamp.attr("id", "lamp" + (i + 1));
        lamp.appendTo(mapDiv);
    }
    //2 PASSO. CREAZIONE DEL VIALETTO
    let vialetto = $("<div></div>");
    vialetto.attr("id", "vialetto");
    vialetto.css("background-image", "url(./img/vialetto.png)");
    vialetto.appendTo(mapDiv);
    //3 PASSO. CREAZIONE DELLE DUE RIGHE CHE CONTERRANNO I COMANDI RELATIVI AL VETTORE COMANDI DICHIARATO NELL'INDEX
    let row;
    //PRIMA RIGA
    row = $("#firstRow");
    for (var i = 0; i < 3; i++) {
        var row1 = $("<div></div>");
        row1.addClass("pulsante");
        row1.attr("id", COMANDI[i]);
        row1.text(COMANDI[i]);
        row.append(row1);
    }
    //SECONDA RIGA
    row = $("#secondRow");
    for (var i = 3; i < 6; i++) {
        var row2 = $("<div></div>");
        row2.addClass("pulsante");
        row2.attr("id", COMANDI[i]);
        row2.text(COMANDI[i]);
        row.append(row2);
    }
    // 4 PASSO. DOPO AVER CREATO "LA PARTE GRAFICA", MI OCCUPO DELLA GESTIONE DEI CLICK DEI SINGOLI PULSANTI.. COME RIFERIMENTO, PRENDO GLI ID
    //GESTIONE DEL CLICK DEL VIALETTO
    $("#Vialetto").click(function () {
        let vial = $("#vialetto");
        let colore = vial.css('background-color');
        if (colore == "rgb(255, 0, 0)")
            vial.css("background-color", "white");
        else
            vial.css("background-color", "red");
    });
    //PRIMA DI GESTIRE IL CLICK DELL'ILLUMINAZIONE, CREO I COMANDI RELATIVI AL VETTORE LIGHTS DICHIARATO NELL'INDEX
    row = $("#extra");
    for (var i = 0; i < LIGHTS.length; i++) {
        var rowe = $("<div></div>");
        rowe.addClass("rights");
        rowe.attr("id", LIGHTS[i]);
        rowe.text(LIGHTS[i]);
        row.append(rowe);
    }
    //ORA GESTIRO' IL CLICK DELL'ILLUMINAZIONE (SIA PULSANTE ILL+ QUELLI DEL LIGHTS)
    $("#Illuminazione").click(function () {
        $("#extra").css("visibility", "visible");
    });
    $("#extra #Studio1").click(function () {
        let on = $("#lamp1");
        if (on.css('background-color') == "rgb(255, 255, 255)")
            on.css("background-color", "yellow");
        else
            on.css("background-color", "white");
    });
    $("#extra #Studio2").click(function () {
        let on = $("#lamp2");
        if (on.css('background-color') == "rgb(255, 255, 255)")
            on.css("background-color", "yellow");
        else
            on.css("background-color", "white");
    });
    $("#extra #SalaPrelievi").click(function () {
        let on = $("#lamp3");
        if (on.css('background-color') == "rgb(255, 255, 255)")
            on.css("background-color", "yellow");
        else
            on.css("background-color", "white");
    });
    $("#extra #SalaAttesa").click(function () {
        let on = $("#lamp4");
        if (on.css('background-color') == "rgb(255, 255, 255)")
            on.css("background-color", "yellow");
        else
            on.css("background-color", "white");
    });
    $("#extra #AccendiTutte").click(function () {

        for (let i = 0; i < 5; i++) {
            $("#lamp" + i).removeClass("lampOff");
            $("#lamp" + i).addClass("lampOn");
        }
    });

    $("#extra #SpegniTutte").click(function () {

        for (let i = 0; i < 5; i++) {
            $("#lamp" + i).removeClass("lampOn");
            $("#lamp" + i).addClass("lampOff");
        }
    })
    //PULSANTE NASCONDI TUTTO
    $("#hider").click(function () {
        $("#extra").css("visibility", "hidden");
    });
    // DOPO AVER GESTITO TUTTI GLI EXTRA E IL PULSANTE ILLUMINAZIONE, MI OCCUPO DEL ROLL DELLA TENDA
    $("#Tenda").click(function () {
        $("#tenda").toggle().css("visibility", "visible");
    });
    //SUCCESSIVAMENTE, ALLA GESTIONE DEL CLICK DELL'ANTIFURTO (caratterizzato da animazione)
    $("#Antifurto").click(function () {
        if ($("#control").attr("id") == undefined) {
            let control = $("<div id='control'></div>");
            control.css({
                "width": "20px",
                "height": "20px",
                "background-color": "red",
                "position": "relative",
                "left": "0px"
            }).appendTo("#map");
            animation(control);
        } else
            $("#control").remove();
    });

    //attraverso la funzione ANIMATE
    function animation(control) {
        let w = '680px'; //sottraggo 20 alla w del map
        let h = '380px'; //sottraggo 20 alla h del map
        control.animate({left: w}, 3000, function () {
            control.animate({top: h}, 3000, function () {
                control.animate({left: 0}, 3000, function () {
                    control.animate({top: 0}, 3000, function () {
                        animation(control);
                    });
                });
            });
        });
    }

    //mi occupo di gestire il click del bottone emergenza
    //MOLTO SIMILE AD ANTIFURTO.. IN SEGUITO DIMOSTRERP' CIO'
    let emergency = false; //supponiamo sempre che non ci sia alcuna emergenza
    row = $("#extra");
    $("#Emergenza").click(function () {
        if (row.css("visibility") == "hidden") {
            row.children().remove();
            for (let i = 0; i < 3; i++) {
                var rowe = $("<div></div>");
                rowe.addClass("rights");
                rowe.attr("id", LIGHTS[i]);
                rowe.text(LIGHTS[i]);
                row.append(rowe);
            }

            row.css("visibility", "visible");

            $("#Studio1").click(function () {
                if (emergency == false) {
                    emergency = true;
                    let eme = createDivEmerg("220px", "120px");
                    //MOMENTO ANIMAZIONE: SEGUENDO LE COORDINATE DELLA GRANDEZZA DEI DIV #STUDIO1 ECCETERA, CREO UNA FUGA PER IL QUADRATINO
                    eme.animate({left: 180}, 800, function () {
                        eme.animate({top: 310}, 2000, function () {
                            eme.animate({left: 140}, 800, function () {
                                //ELIMINATA L'EMERGENZA, POSSO RENDERLA NUOVAMENTE INVISIBILE (O ANCOR MEGLIO, LA RIMUOVO)
                                eme.remove();
                                emergency = false;
                            });
                        })
                    });
                }
            });
            //lo stesso procedimento per lo studio2, SALA PRELIEVI, SALA ATTESA
            $("#Studio2").click(function () {
                if (emergency == false) {
                    emergency = true;
                    let eme = createDivEmerg("345px", "90px");
                    eme.animate({left: 380}, 800, function () {
                        eme.animate({top: 180}, 800, function () {
                            eme.animate({left: 300}, 800, function () {
                                eme.animate({top: 310}, 800, function () {
                                    eme.animate({left: 140}, 800, function () {
                                        eme.remove();
                                        emergency = false;
                                    });
                                });
                            });
                        })
                    });
                }
            });
            $("#SalaPrelievi").click(function () {
                if (emergency == false) {
                    emergency = true;
                    let eme = createDivEmerg("480px", "140px");
                    eme.animate({top: 220}, 800, function () {
                        eme.animate({left: 300}, 2000, function () {
                            eme.animate({top: 310}, 800, function () {
                                eme.animate({left: 140}, 800, function () {
                                    eme.remove();
                                    emergency = false;
                                });
                            });
                        })
                    });
                }
            });
        }
    });

    function createDivEmerg(l, t) {
        //STESSO MODO DI CREARE IL DIV PER L'ANTIFURTO
        let emerg = $("<div id='emergenza'><div/>");
        emerg.css({
            "width": "20px",
            "height": "20px",
            "background-color": "pink",
            "borderRadius": "25px",
            "position": "relative",
            "left": l,
            "top": t
        }).appendTo("#map");
        return emerg;
    }

    //ADESSO, MI OCCUPO DELL'ULTIMO PULSANTE, OVVERO QUELLO DELL'IRRAGAZIONE
    $("#Irrigazione").click(function () {
        //rendo visibili i due irr
        $(".irrigatore").css("visibility", "visible")
        //gestisco il loro movimento
        $(".irrigatore").fadeIn(600, function () {
            $(".irrigatore").css("transform", "rotate(20deg)");
            for (let i = 0; i < 21; i++) {
                setTimeout(rotate(i),1000)
            }
            clearInterval();
            /*$(".irrigatore").fadeOut(600, function () {
                $(".irrigatore").css("transform", "rotate(0deg)");
            })*/
        });
    })
    function rotate(i) {
        $(".irrigatore").css("transform", "rotate("+"i"*"20deg)")
    }
})
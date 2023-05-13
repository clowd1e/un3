const rowDiv = document.querySelector('.row-numbers')
const columnDiv = document.querySelector('.column-numbers')
const tableDiv = document.querySelector('.table10x10')
const rowNumbers = rowDiv.children
const columnNumbers = columnDiv.children
const table = tableDiv.children
for (let i = 0; i < table.length; i++) {
    for (let k = 0; k < 10; k++) {
        let newP = document.createElement('p')
        table[i].appendChild(newP)
    }
    
}
for (let i = 0; i < table.length; i++) {
    for (let k = 0; k < 10; k++) {
        table[i].children[k].innerHTML = parseInt(columnNumbers[i].textContent) * parseInt(rowNumbers[k].textContent)
    }
}

const listOfNames = ['Oleksandr', 'Daniil', 'Maksym', 'Mykyta', 'Kacper', 'Jaromir', 'Fillip', 'Piotr', 'Mikolaj', 'Szymon', 'Ryszard', 'Franciszek']
const listOfSurnames = ['Zavinoski', 'Nowak', 'Kowalski', 'Wójcik', 'Kowalczyk', 'Lewandowski', 'Abramowski', 'Babiec', 'Całus', 'Dacewiecz', 'Zabawski']
let JsonObject
let numOfRecords

checkAmountOfRecords()
function checkAmountOfRecords() {
    numOfRecords = parseInt(prompt('Napisz ilość rekordów do wypisania niżej lub równą 20: '))
    if (numOfRecords >= 1 && numOfRecords <= 20) {
        createJsonObject(numOfRecords, listOfNames, listOfSurnames)
    } else {
        alert('Wpisaleś błądną liczbę! Sprobuj ponownie')
        checkAmountOfRecords()
    }
}

function createJsonObject(num, listN, listS) {
    const object = {}
    for (let n = 1; n < num + 1; n++) {
        let randomNameNum = Math.floor(Math.random() * (listN.length - 1))
        let randomSurnameNum = Math.floor(Math.random() * (listS.length - 1))
        let tag = "person" + n
        let i = 0
        let pin = ''
        while (i < 4) {
            pin += Math.floor(Math.random() * 10)
            i++
        }
        let objPerson = {
            "name": listN[randomNameNum],
            "surname": listS[randomSurnameNum],
            "age": Math.floor(Math.random() * 72 + 18),
            "phone number": Math.floor(Math.random() * 3000000 + 5000000),
            "account number": Math.floor(Math.random() * 89999999 + 1000000),
            "pin": pin,
            "money": Math.floor(Math.random() * 90000 + 10000)
        }
        object[tag] = JSON.stringify(objPerson)
    }
    JsonObject = JSON.stringify(object)
    console.log(JsonObject)
}
const newJsonObj = JSON.parse(JsonObject)
// console.log(newJsonObj)
const tbl = document.getElementById('JSON-table')
const tblTr = tbl.children[0].children
// console.log(tblTr)
for (let i = 0; i < tblTr.length; i++) {
    if (i == 0) {
        let th = document.createElement('th')
        tblTr[0].append(th)
        let temp = 0
        while (temp < numOfRecords) {
            let th = document.createElement('th')
            th.textContent = Object.keys(JSON.parse(JsonObject))[temp]
            tblTr[0].append(th)
            temp++
        }
    } else {
        for (let k = 0; k < numOfRecords; k++) {
            let td = document.createElement('td')
            let temp = Object.values(JSON.parse(JsonObject))[k]
            if (i == tblTr.length - 1) {
                td.textContent = Object.values(JSON.parse(temp))[i-1] + ' zł'
            } else {
                td.textContent = Object.values(JSON.parse(temp))[i-1]
            }
            tblTr[i].append(td)
        }
    }
}

// Listowanie osób
var newJsonObjBank = JSON.parse(JsonObject)
// console.log(newJsonObjBank)
const accNumInpt = document.getElementById('account-number')
const pinKodInpt = document.getElementById('pin-kod')
const logInBtn = document.getElementById('log-in')
const bankForm = document.querySelector('.bank-form')
const infoDiv = document.getElementById('info')
const infoBack = document.querySelector('.info-background')
logInBtn.addEventListener('click', function() {
    let accNum = accNumInpt.value
    let pinKod = pinKodInpt.value
    let tempBool = false
    let indexOfPerson = 0
    for (let i = 0; i < Object.keys(newJsonObjBank).length; i++) {
        if (JSON.parse(Object.values(newJsonObjBank)[i])["account number"] == accNum) {
            tempBool = true
            indexOfPerson = i
        }
    }
    if (tempBool) {
        if (pinKod == JSON.parse(Object.values(newJsonObjBank)[indexOfPerson])["pin"]) {
            infoBack.style.display = 'flex'
            const divNames = ["name", "surname", "money"]
            let div1 = document.createElement('div')
            let div2 = document.createElement('div')
            div2.className = 'info-button-choose'
            for (let i = 0; i < divNames.length; i++) {
                let p = document.createElement('p')
                if (i == divNames.length - 1) {
                    p.textContent = divNames[i] + ': ' + JSON.parse(Object.values(newJsonObjBank)[indexOfPerson])[divNames[i]] + ' zł'
                } else {
                    p.textContent = divNames[i] + ': ' + JSON.parse(Object.values(newJsonObjBank)[indexOfPerson])[divNames[i]]
                }
                div1.append(p)
            }
            let temp = 0
            while (temp < 2) {
                let btn = document.createElement('button')
                btn.className = 'info-button'
                if (temp == 0) {
                    btn.textContent = 'Wybrać gotówkę'
                    btn.className = 'info-button1'
                } else if (temp == 1) {
                    btn.textContent = 'Wpłacić gotówkę'
                    btn.className = 'info-button2'
                }
                div2.append(btn)
                temp++
            }
            infoDiv.append(div1)
            infoDiv.append(div2)
            let divBtnChildren = Array.from(document.querySelector('.info-button-choose').children)
            divBtnChildren.forEach(elem => {
                elem.addEventListener('click', function() {
                    if (infoDiv.lastChild.classList.contains('secoption-btn-div')) {
                        infoDiv.removeChild(infoDiv.lastChild)
                    }
                    let k
                    if (elem.classList.contains('info-button1')) {
                        k = 'wybrać'
                    } else if (elem.classList.contains('info-button2')) {
                        k = 'wpłacić'
                    }
                    let string = 'Ile ' + k + ' gotówki?'
                    let div3 = document.createElement('div')
                    div3.className = 'secoption-btn-div'
                    let label = document.createElement('label')
                    let inpt = document.createElement('input')
                    let btn = document.createElement('button')
                    btn.className = 'send-button-info'
                    btn.textContent = 'Zakończ operację'
                    label.textContent = string
                    inpt.type = 'text'
                    div3.append(label)
                    div3.append(inpt)
                    div3.append(btn)
                    infoDiv.append(div3)
                    btn.addEventListener('click', function() {
                        let inptValue = parseInt(inpt.value)
                        if (typeof inptValue != 'number') {
                            const div3Children = div3.children
                            if (document.querySelector('.div3-p') == undefined) {
                                let p = document.createElement('p')
                                p.className = 'div3-p'
                                p.textContent = 'Wpisz poprawną liczbę'
                                div3.insertBefore(p, div3Children[2])
                            } 
                        } else if (k == 'wybrać' && inptValue > JSON.parse(Object.values(newJsonObjBank)[indexOfPerson])[divNames[2]]) {
                            const div3Children = div3.children
                            if (document.querySelector('.div3-p' == undefined)) {
                                let p = document.createElement('p')
                                p.className = 'div3-p'
                                p.textContent = 'Błąd! Liczba wybranej gotówki jest większa od rozmiaru konta'
                                div3.insertBefore(p, div3Children[2])
                            }
                        } else if (k == 'wybrać' && inptValue <= JSON.parse(Object.values(newJsonObjBank)[indexOfPerson])[divNames[2]]) {
                            let d = JSON.parse(Object.values(newJsonObjBank)[indexOfPerson])
                            let temp = d["money"] - inptValue
                            d["money"] = temp
                            console.log(JSON.stringify(d))
                            Object.values(newJsonObjBank)[indexOfPerson] = JSON.stringify(d)
                            console.log(Object.values(newJsonObjBank)[indexOfPerson] = JSON.stringify(d))
                            console.log(Object.values(newJsonObjBank)[indexOfPerson])
                            console.log(newJsonObjBank)
                        } else if (k == 'wpłacić' && inptValue > 0) {
                            let d = JSON.parse(Object.values(newJsonObjBank)[indexOfPerson])
                            let temp = d["money"] + inptValue
                            d["money"] = temp
                            console.log(JSON.stringify(d))
                            Object.values(newJsonObjBank)[indexOfPerson] = JSON.stringify(d)
                            console.log(Object.values(newJsonObjBank)[indexOfPerson] = JSON.stringify(d))
                            console.log(Object.values(newJsonObjBank)[indexOfPerson])
                        }
                    })
                })
            })
        } else {
            if (document.querySelector('.bank-form-p1') == undefined) {
                if (document.querySelector('.bank-form-p2') != undefined) {
                    document.querySelector('.bank-form-p2').parentElement.removeChild(document.querySelector('.bank-form-p2'))
                }
                let p = document.createElement('p')
                p.className = 'bank-form-p1'
                p.textContent = 'Niepoprawny Pin-Kod!'
                bankForm.insertBefore(p, bankForm.children[2])
            }
        }
    } else if (!tempBool) {
        if (document.querySelector('.bank-form-p2') == undefined) {
            if (document.querySelector('.bank-form-p1') != undefined) {
                document.querySelector('.bank-form-p1').parentElement.removeChild(document.querySelector('.bank-form-p1'))
            }
            let p = document.createElement('p')
            p.className = 'bank-form-p2'
            p.textContent = 'Niepoprawny Login lub Pin-Kod!'
            bankForm.insertBefore(p, bankForm.children[2])
        }
    }
})

let closeBtn = document.querySelector('.close')
closeBtn.addEventListener('click', function() {
    infoBack.style.display = 'none'
})
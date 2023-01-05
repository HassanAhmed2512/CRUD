let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let create = document.getElementById('create');
let search = document.getElementById('search');
let searchtiltle = document.getElementById('searchtiltle');
let searchcategory = document.getElementById('searchcategory');
let update = document.getElementById('update');
let deletee = document.getElementById('deletee');
let mood = 'create';
let justtoknow;
let moodforsearch;

// get total
function gettotal() {
    if (price.value != "") {
        let result = (+price.value + +taxes.value + +ads.value) - discount.value;
        total.innerHTML = result;
        total.style.background = 'green';
    } else {
        total.innerHTML = "";
        total.style.background = "red";
    }
}
let datapro;
if (localStorage.product != null) {
    datapro = JSON.parse(localStorage.product)
} else {
    datapro = [];
}
create.onclick = function() {
    let newpro = {
        title: title.value,
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        count: count.value,
        category: category.value,
    }
    if (title.value != "" && price.value != "" && category.value != "" && count.value < 100) {
        if (mood === 'create') {
            if (newpro.count > 1) {
                for (i = 0; i < newpro.count; i++) {
                    datapro.push(newpro);
                }
            } else {
                datapro.push(newpro);
            }
        } else {
            datapro[justtoknow] = newpro;
            count.style.display = 'block';
            mood = 'create';
            create.innerHTML = "Create"
        }
        cleardata();
    }
    localStorage.setItem('product', JSON.stringify(datapro));

    showdata();
}

function cleardata() {
    title.value = "";
    price.value = "";
    taxes.value = "";
    ads.value = "";
    discount.value = "";
    count.value = "";
    category.value = "";
}

function showdata() {
    let table = "";
    for (let i = 0; i < datapro.length; i++) {
        table +=
            `
               <tr>
            <td>${i+1}</td>
            <td>${datapro[i].title}</td>
            <td>${datapro[i].price}</td>
            <td>${datapro[i].taxes}</td>
            <td>${datapro[i].ads}</td>
            <td>${datapro[i].discount}</td>
            <td>${datapro[i].category}</td>
            <td><button onclick="updatedata(${i})" id="update"> update</button></td>
            <td><button onclick="deleteee(${i})" id="deletee"> deletee</button></td>
        </tr>
        `
    }
    document.getElementById('tbody').innerHTML = table;
    let newbtm = document.getElementById('deleteall');
    if (datapro.length > 0) {
        newbtm.innerHTML = `<button onclick="deleteAll()" > delete all ${datapro.length} </button>`
    } else { newbtm.innerHTML = `` }
    gettotal();
}
showdata()

function deleteee(i) {
    datapro.splice(i, 1);
    localStorage.product = JSON.stringify(datapro);
    showdata()
}

function deleteAll() {
    datapro.splice(0);
    localStorage.product = JSON.stringify(datapro);
    showdata();
}

function updatedata(i) {
    title.value = datapro[i].title.toLowerCase();
    price.value = datapro[i].price;
    taxes.value = datapro[i].taxes;
    ads.value = datapro[i].ads;
    discount.value = datapro[i].discount;
    category.value = datapro[i].category.toLowerCase();
    gettotal();
    count.style.display = 'none';
    create.innerHTML = 'Update';
    mood = 'update'
    justtoknow = i;
    scroll({
        top: 0
    });
}

function getsearchmood(id) {
    if (id == 'searchtiltle') {
        moodforsearch = 'title';
        search.ariaPlaceholder = 'search by title';
    } else {
        moodforsearch = 'category';
        search.ariaPlaceholder = 'search by category';
    }
    search.focus();
    search.value = "";
    showdata();
}

function searchdata(value) {
    let table = "";
    if (moodforsearch == 'title') {
        for (i = 0; i < datapro.length; i++) {
            if (datapro[i].title.includes(value.toLowerCase())) {
                table +=
                    `
                   <tr>
                <td>${i}</td>
                <td>${datapro[i].title}</td>
                <td>${datapro[i].price}</td>
                <td>${datapro[i].taxes}</td>
                <td>${datapro[i].ads}</td>
                <td>${datapro[i].discount}</td>
                <td>${datapro[i].category}</td>
                <td><button onclick="updatedata(${i})" id="update"> update</button></td>
                <td><button onclick="deleteee(${i})" id="deletee"> deletee</button></td>
            </tr>
            `
            }
        }
    } else {
        for (i = 0; i < datapro.length; i++) {
            if (datapro[i].category.includes(value.toLowerCase())) {
                table +=
                    `
                   <tr>
                <td>${i}</td>
                <td>${datapro[i].title}</td>
                <td>${datapro[i].price}</td>
                <td>${datapro[i].taxes}</td>
                <td>${datapro[i].ads}</td>
                <td>${datapro[i].discount}</td>
                <td>${datapro[i].category}</td>
                <td><button onclick="updatedata(${i})" id="update"> update</button></td>
                <td><button onclick="deleteee(${i})" id="deletee"> deletee</button></td>
            </tr>
            `
            }
        }

    }
    document.getElementById('tbody').innerHTML = table;
}
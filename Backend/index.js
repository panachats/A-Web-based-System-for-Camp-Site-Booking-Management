var url = 'http://localhost:3000'

function checkinDate() {    //ตรวจสอบวันที่ Check in
    const today = new Date().toISOString().split("T")[0];
    const chkin = document.getElementById('checkin').value
    if (chkin < today) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Wrong Check-in Date!',
        })
        document.getElementById('checkin').value = '';
    }
}

function checkoutDate() {   //ตรวจสอบวันที่ Check out
    const today = new Date().toISOString().split("T")[0];
    const chkin = document.getElementById('checkin').value
    const chkout = document.getElementById('checkout').value
    if (chkout < today || chkout < chkin) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Wrong Check-out Date!',
        })
        document.getElementById('checkout').value = '';
    }
}

// Note : จริง ๆ น่าจะเปลี่ยนชื่อเป็นอย่างอื่นที่ไม่ใช่ createData แต่นึกชื่อไม่ออกเลยใช้อันนี้ล่ะ ;-;
function createData() { //บันทึกข้อมูลลงใน Session
    console.log("function createData() is called");
    var chkin = document.getElementById('checkin').value
    var chkout = document.getElementById('checkout').value
    var adult = document.getElementById('adult').value
    var children = document.getElementById('children').value
    if (chkin == '' || chkout == '' || adult == '' || children == '') { //ตรวจสอบไม่ให้ Field ที่กรอกข้อมูลมีค่า Null
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please Fill Out All Form',
        })
    } else { //เก็บข้อมูลที่ผู้ใช้กรอกใน Session (ข้อมูลจะอยู่ตลอดไปจนกว่าผู้ใช้จะปิดแท็ปหรือปิด Browser)
        sessionStorage.setItem('chkin', chkin)
        sessionStorage.setItem('chkout', chkout)
        sessionStorage.setItem('adult', adult)
        sessionStorage.setItem('children', children)
        window.open("tentsite.html");   //เปิดแท็ปใหม่ตาม Path ที่กำหนด (สาเหตุที่ทำแบบนี้เพราะว่าถ้าใช้ Attribute target ="_blank" ข้อมูล 4 บรรทัดข้างบนมันจะไม่ถูกบันทึกลงใน Session เหมือนว่ามันเปิดแท็ปใหม่ก็จริงแต่ว่ามันเป็นคนละ Session กัน แล้วทีนี้พอจะเรียกข้อมูลมาใช้มันก็จะเป็น Undefined)
    }

}

function readData() { // อ่านข้อมูลจาก JSON แล้วนำข้อมูลนั้นมาสร้างเป็น Card โดยใช้ Bootstrap
    console.log("function createData() is called");
    var html = '<div class="row">'

    fetch(url + '/user')
        .then(response => response.json())
        .then(data => {
            for (const x of data) {
                console.log(x.id);
                // + สะสมค่าที่เป็นคำสั่ง HTML เรื่อย ๆ
                html += `<div class="card" style="width: 18rem;">   
                <img src="${x.img}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${x.id}</h5>
                    <p class="card-text">รายการจองของ ${x.user} ${x.sname}</p>
                    <a href="#" class="btn btn-primary">Go somewhere</a>
                </div>
            </div>`
            }
            html += '</div>'
            document.getElementById("showdata").innerHTML = html    //แล้วเอาข้อความที่เก็บเป็นคำสั่ง HTML เมื่อกี้มาสร้างเป็น HTML บนหน้าเว็บจริงตู้มเดียว
        })
}


function loadBooking() {
    var html = ``
    fetch(url + "/location")
        .then(response => response.json())
        .then(locationData => {
            fetch(url + "/booking")
                .then(response => response.json())
                .then(bookingData => {
                    for (const x of bookingData) {  //Loop เพื่อไล่หาข้อมูลการจองของลูกค้าทุกคน
                        for (const y of locationData) { //Loop เพื่อไล่หาข้อมูลสถานที่ที่มีบริการจองลานกางเต๊นท์ทั้งหมด
                            if (y['name'] == x['location']) {   // แล้วกรองหาชื่อสถานที่ที่มีกับสถานที่ที่ผู้ใช้ได้จองเอาไว้ ถ้าตรงกันก็เอาข้อมูลทั้งหมดนั้นแหละมาใส่ใน HTML
                                html += `
                                <div class="col ">
                <div class="card border-0" >
                <img src="${y["img"]}"
                class="card-img-top" alt="..." class="card-img-top" alt="...">
                    <div class="card-body">
                    <h5 class="card-title">${x['location']}</h5>
                    <p class="card-text">
                    Check in date : <b>${x['check in']}</b>
                    </p>
                    <p class="card-text">
                    Check out date : <b>${x['check out']}</b>
                    </p>
                   
                    </div>
                    <div class="card-footer text-muted">
                    <button onclick="viewBooking(${x['id']})" class="btn btn-primary">View Booking</button>
                    <button class="btn btn-warning" onclick="editBooking(${x['id']})"><i class="fa-solid fa-pen-to-square"></i></button>
                <button class="btn btn-danger" onclick="deleteBooking(${x['id']})"><i class="fa-solid fa-trash"></i></button>
                    </div>
                </div>
            </div>`
                            }
                        }
                    }

                    if (html == ``) {   //เขียนดักไว้เผื่อว่าไม่มีข้อมูลการจอง ผู้ใช้จะได้ไม่ต้องรออยู่หน้านั้นนาน ๆ
                        document.getElementById('booking1').innerHTML = `<h1><font color="white">No Booking Data</font></h1>`
                    } else {
                        document.getElementById('booking1').innerHTML = html
                    }


                })

        })
}


function newTab(link) { //สร้างเผื่อเอาไว้ให้ฝั่ง HTML เรียกไปใช้มันจะได้อยู่ใน Session เดียวกัน
    window.open(link);
}

function viewBooking(id) { //Function ของปุ่ม View Booking ของหน้า My Booking ส่วน id ที่เป็น Parameter นั้นจะรับมาจาก HTML ใน Function loadBooking() ข้างบน
    fetch(url + '/booking')
        .then(response => response.json())
        .then(bookingData => {
            for (const x of bookingData) {
                if (x['id'] == id) {    //ถ้า ID ที่เก็บไว้ใน JSON ตรงกับข้อมูลที่รับมาก็เรียก Sweet Alert แล้วแสดงข้อมูล
                    Swal.fire({
                        title: 'Booking Detail',
                        html:
                            `<div class="mb-3">
                        <span class="form-label">Location</span><br>
                        <input class="form-control" type="text" value="${x['location']}" disabled><br>
                        <label class="form-label">Check in Date:</label><br>
                        <input class="form-control" type="text" value="${x['check in']}" disabled><br>
                        <label class="form-label">Check out Date:</label><br>
                        <input class="form-control" type="text" value="${x['check out']}" disabled><br>
                        <label class="form-label">Adult (person)</label><br>
                        <input class="form-control" type="text" value="${x['adult']}" disabled><br>
                        <label class="form-label">Children (person)</label><br>
                        <input class="form-control" type="text" value="${x['children']}" disabled><br>
                        <label class="form-label">Firstname</label><br>
                        <input class="form-control" type="text" value="${x['firstname']}" disabled><br>
                        <label class="form-label">Lastname</label><br>
                        <input class="form-control" type="text" value="${x['lastname']}" disabled><br>
                        <label class="form-label">Email</label><br>
                        <input class="form-control" type="text" value="${x['email']}" disabled><br>
                        <label class="form-label">Phone</label><br>
                        <input class="form-control" type="text" value="${x['phone']}" disabled><br>
                        <label class="form-label">Total Price</label><br>
                        <input class="form-control" type="text" value="${x['total price']}" disabled>
                        </div>`,
                        focusConfirm: false,
                        confirmButtonText: 'Close',
                        preConfirm: () => {
                            return [
                            ]
                        }
                    })
                }
            }
        })
}

function editBooking(id) {  // Function ของปุ่มแก้ไขการจอง ซึ่งก็เอา id มาจาก Function loadbooking() เหมือนกัน
    var adult = ''
    var children = ''
    var firstname = ''
    var lastname = ''
    var email = ''
    var phone = ''

    fetch(url + `/booking/${id}`)   // Function ข้างบนมันเขียนแบบนี้ได้ไหมก็ยังไม่เคยลอง
        .then(response => response.json())
        .then(bookingData => {
            Swal.fire({
                title: `Edit Booking ID : ${id}`,
                html:
                    `<div class="mb-3">
                    <span class="form-label">Location</span><br>
                    <input class="form-control" type="text" value="${bookingData['location']}" disabled><br>
                    <label class="form-label">Check in Date:</label><br>
                    <input class="form-control" type="text" value="${bookingData['check in']}" disabled><br>
                    <label class="form-label">Check out Date:</label><br>
                    <input class="form-control" type="text" value="${bookingData['check out']}" disabled><br>
                    <label class="form-label">Adult (person)</label><br>
                    <input class="form-control" type="number" value="${bookingData['adult']}" min="1" id="adult"><br>
                    <label class="form-label">Children (person)</label><br>
                    <input class="form-control" type="number" value="${bookingData['children']}" min="0" id="children"><br>
                    <label class="form-label">Firstname</label><br>
                    <input class="form-control" type="text" value="${bookingData['firstname']}" id="firstname"><br>
                    <label class="form-label">Lastname</label><br>
                    <input class="form-control" type="text" value="${bookingData['lastname']}" id="lastname"><br>
                    <label class="form-label">Email</label><br>
                    <input class="form-control" type="text" value="${bookingData['email']}" id="email"><br>
                    <label class="form-label">Phone</label><br>
                    <input class="form-control" type="text" value="${bookingData['phone']}" id="phone"><br>
                    <label class="form-label">Total Price</label><br>
                    <input class="form-control" type="text" value="${bookingData['total price']}" disabled>
                    </div>`,

                focusConfirm: false,
                showCancelButton: true,
                preConfirm: () => {
                    return [
                        adult = document.getElementById('adult').value,
                        children = document.getElementById('children').value,
                        firstname = document.getElementById('firstname').value,
                        lastname = document.getElementById('lastname').value,
                        email = document.getElementById('email').value,
                        phone = document.getElementById('phone').value,

                        fetch(url + `/booking/${id}`, { //ถ้าผู้ใช้กด OK มาก็จะเรียก Fetch อีกรอบมา Update ข้อมูล
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body:
                                JSON.stringify({    //การจะ Update ข้อมูลจะต้องส่งข้อมูลไปทุก Field ไม่งั้น Field ที่มีอยู่เดิมก่อนการ Update จะหายไป
                                    "id": id,
                                    "location": bookingData['location'],
                                    "check in": bookingData['check in'],
                                    "check out": bookingData['check out'],
                                    "adult": adult,
                                    "children": children,
                                    "firstname": firstname,
                                    "lastname": lastname,
                                    "email": email,
                                    "phone": phone,
                                    "tent": bookingData['tent'],
                                    "tent_amount": bookingData['tent_amount'],
                                    "fishing": bookingData['fishing'],
                                    "moo-gata": bookingData['moo-gata'],
                                    "moo-gata-size": bookingData['moo-gata-size'],
                                    "total price": bookingData['total price']
                                })
                        }).then(response => response.json())
                            .then(data => console.log(data))
                            .catch(error => console.log(error))

                    ],
                        Swal.fire('Saved!', '', 'success'),
                        location.reload(); // Reload หน้าเว็บ
                }
            })




        })
}

function deleteBooking(id) { // ลบข้อมูลการจอง ซึ่งก็เอา id มาจาก Function loadbooking() เหมือนกัน
    console.log(id);
    Swal.fire({
        title: 'Are you sure?',
        text: "This will delete (cancel) your booking. And you won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: "No",
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, cancel it'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
            )

            fetch(url + `/booking/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "_id": id
                })
            })
                .then(response => response.json())
                .then(data => console.log(data))
                .catch(error => console.log(error))
            location.reload();  // Reload หน้าเว็บ

        }
    })
}

function loadTable() {  // Function ที่ใช้ในหน้าของ Admin
    fetch(url + '/booking')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            var trHTML = '';
            var num = 1;
            for (let object of data) { // วน Loop เพื่ออ่านข้อมูลทั้งหมดที่มีของ Document Booking
                trHTML += "<tr>";
                trHTML += "<td>" + num + "</td>";
                trHTML += "<td>" + object["location"] + "</td>";
                trHTML += "<td>" + object["check in"] + "</td>";
                trHTML += "<td>" + object["check out"] + "</td>";
                trHTML += "<td>" + object["adult"] + "</td>";
                trHTML += "<td>" + object["children"] + "</td>";
                // trHTML += "<td>" + object["firstname"] + "</td>";
                // trHTML += "<td>" + object["lastname"] + "</td>";
                trHTML += "<td>" + object["email"] + "</td>";
                trHTML += "<td>" + object["phone"] + "</td>";
                trHTML += "<td>" + object["tent"] + "</td>";
                trHTML += "<td>" + object["tent_amount"] + "</td>";
                trHTML += "<td>" + object["fishing"] + "</td>";
                trHTML += "<td>" + object["moo-gata"] + "</td>";
                trHTML += "<td>" + object["moo-gata-size"] + "</td>";
                trHTML += "<td>" + object["total price"] + "</td>";
                trHTML += `<td><button type="submit" class="btn btn-danger" onclick="deleteBooking(${object['id']})"><i class="fa-solid fa-trash"></i></button></td>`;
                trHTML += "</tr>";
                num++;
            }
            document.getElementById('table').innerHTML = trHTML
        })
}

function selectOption(location_name, site_price, tent_price) { //Function แสดงหน้าต่างการจองและเลือก Option เสริมในหน้าของสถานที่แต่ละที่ รับ Parameters มาจาก ไฟล์ HTML
    var html = ''
    var chkin = sessionStorage.getItem('chkin') //เรียกข้อมูลที่เก็บไว้ใน Session มาใช้
    var chkout = sessionStorage.getItem('chkout')
    var adult = sessionStorage.getItem('adult')
    var children = sessionStorage.getItem('children')

    function totalPrice(location_name, fname, lname, email, phone) {    // Function ที่ใช้แสดงหน้าต่างสรุปราคา ซึ่งรับ Parameters มาจาก Function selectOption อีกทีหนึ่ง
        var tentsite = parseInt(document.getElementById('tentsite').value)
        let timerInterval
        site_price = parseInt(site_price)
        tent_price = parseInt(tent_price)

        var totalPrice = 0

        switch (location_name) { //ใช้ Switch case เพื่อดูว่าผู้ใช้จองสถานที่ไหน เพราะว่าแต่ละสถานที่มี Option เสริมไม่เหมือนกัน
            case 'Camping is life':
                var fishing = parseInt(document.getElementById('fishing').value)
                totalPrice = site_price + fishing
                Swal.fire({ // เรียกใช้ Sweet Alert แบบกำหนดเวลา
                    title: 'Confirmation Your Booking',
                    html:
                        `<div class="mb-3">
                    <span class="form-label">Location</span><br>
                    <input class="form-control" type="text" value="${location_name}" disabled><br>
                    <label class="form-label">Check in Date:</label><br>
                    <input class="form-control" type="text" value="${chkin}" disabled><br>
                    <label class="form-label">Check out Date:</label><br>
                    <input class="form-control" type="text" value="${chkout}" disabled><br>
                    <label class="form-label">Adult (person)</label><br>
                    <input class="form-control" type="text" value="${adult}" disabled><br>
                    <label class="form-label">Children (person)</label><br>
                    <input class="form-control" type="text" value="${children}" disabled><br>
                    <label class="form-label">Firstname</label><br>
                    <input class="form-control" type="text" value="${fname}" disabled><br>
                    <label class="form-label">Lastname</label><br>
                    <input class="form-control" type="text" value="${lname}" disabled><br>
                    <label class="form-label">Email</label><br>
                    <input class="form-control" type="text" value="${email}" disabled><br>
                    <label class="form-label">Phone</label><br>
                    <input class="form-control" type="text" value="${phone}" disabled><br>
                    <label class="form-label">Total Price</label><br>
                    <input class="form-control" type="text" value="${totalPrice}" disabled><br>
                    </div>`,
                    // '<label class="form-label"><b>Booking Detail</b></label><hr class="hr">'+
                    // `
                    // <input id="swal-input1" class="swal2-input" value="${chkin}" disable>` +
                    // `<input id="swal-input2" class="swal2-input" value="${chkout}"disable>` +
                    // `<input id="swal-input3" class="swal2-input" value="${adult}"disable>` +
                    // `<input id="swal-input4" class="swal2-input" value="${children}"disable>`+
                    // `<input id="swal-input5" class="swal2-input" value="${totalPrice}"disable>`,
                    showCancelButton: true,
                    focusConfirm: false,
                    preConfirm: () => { }
                }).then((result) => {
                    if (result.isConfirmed) {
                        Swal.fire({
                            title: 'Booking Complete!',
                            html: 'We will redirect you to "My booking" in <b></b> milliseconds.',
                            timer: 3000,    // กำหนดเวลา - วินาที
                            timerProgressBar: true,
                            icon: 'success',
                            confirmButtonText: 'Close',
                            didOpen: () => {
                                // Swal.showLoading()
                                const b = Swal.getHtmlContainer().querySelector('b')
                                timerInterval = setInterval(() => {
                                    b.textContent = Swal.getTimerLeft()
                                }, 100)
                            },
                            willClose: () => {
                                clearInterval(timerInterval)
                            }
                        }).then((result) => {
                            /* Read more about handling dismissals below */
                            if (result.dismiss === Swal.DismissReason.timer) {  //ถ้าครบเวลาก็จะบันทึกข้อมูล และพาไปหน้า My Booking
                                return [
                                    fetch(url + '/booking', {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json'
                                        },
                                        body: JSON.stringify({
                                            "id": null,
                                            "location": location_name,
                                            "check in": chkin,
                                            "check out": chkout,
                                            "adult": adult,
                                            "children": children,
                                            "firstname": fname,
                                            "lastname": lname,
                                            "email": email,
                                            "phone": phone,
                                            "tent": 'N/A',
                                            "tent_amount": 'N/A',
                                            "fishing": fishing,
                                            "moo-gata": 'N/A',
                                            "moo-gata-size": 'N/A',
                                            "total price": totalPrice

                                        })

                                    }).then(response => response.json())
                                        .then(data => console.log(data))
                                        .catch(error => console.log(error))
                                ],
                                    window.open("booking.html") //เปิดแท็ปใหม่ซึ่งพาไปหน้า My Booking
                            } else { //แต่ถ้าผู้ใช้ปิดหน้าต่าง Sweet Alert ไปก่อนก็จะบันทึกข้อมูลอย่างเดียว และจะไม่พาผู้ใช้ไปหน้า My Booking
                                return [
                                    fetch(url + '/booking', {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json'
                                        },
                                        body: JSON.stringify({
                                            "id": null,
                                            "location": location_name,
                                            "check in": chkin,
                                            "check out": chkout,
                                            "adult": adult,
                                            "children": children,
                                            "firstname": fname,
                                            "lastname": lname,
                                            "email": email,
                                            "phone": phone,
                                            "tent": 'N/A',
                                            "tent_amount": 'N/A',
                                            "fishing": fishing,
                                            "moo-gata": 'N/A',
                                            "moo-gata-size": 'N/A',
                                            "total price": totalPrice

                                        })

                                    }).then(response => response.json())
                                        .then(data => console.log(data))
                                        .catch(error => console.log(error))
                                ]
                            }
                        })
                    }
                })
                break;
            case 'Pha hee':
                var moo_gata = parseInt(document.getElementById('moo-gata').value)
                totalPrice = ((site_price * adult) + (site_price * children)) + moo_gata
                Swal.fire({
                    title: 'Confirmation Your Booking',
                    html:
                        `<div class="mb-3">
                    <label class="form-label">Location</label><br>
                    <input class="form-control" type="text" value="${location_name}" disabled><br>
                    <label class="form-label">Check in Date:</label><br>
                    <input class="form-control" type="text" value="${chkin}" disabled><br>
                    <label class="form-label">Check out Date:</label><br>
                    <input class="form-control" type="text" value="${chkout}" disabled><br>
                    <label class="form-label">Adult (person)</label><br>
                    <input class="form-control" type="text" value="${adult}" disabled><br>
                    <label class="form-label">Children (person)</label><br>
                    <input class="form-control" type="text" value="${children}" disabled><br>
                    <label class="form-label">Firstname</label><br>
                    <input class="form-control" type="text" value="${fname}" disabled><br>
                    <label class="form-label">Lastname</label><br>
                    <input class="form-control" type="text" value="${lname}" disabled><br>
                    <label class="form-label">Email</label><br>
                    <input class="form-control" type="text" value="${email}" disabled><br>
                    <label class="form-label">Phone</label><br>
                    <input class="form-control" type="text" value="${phone}" disabled><br>
                    <label class="form-label">Total Price</label><br>
                    <input class="form-control" type="text" value="${totalPrice}" disabled><br>
                    </div>`,
                    // '<label class="form-label"><b>Booking Detail</b></label><hr class="hr">'+
                    // `
                    // <input id="swal-input1" class="swal2-input" value="${chkin}" disable>` +
                    // `<input id="swal-input2" class="swal2-input" value="${chkout}"disable>` +
                    // `<input id="swal-input3" class="swal2-input" value="${adult}"disable>` +
                    // `<input id="swal-input4" class="swal2-input" value="${children}"disable>`+
                    // `<input id="swal-input5" class="swal2-input" value="${totalPrice}"disable>`,
                    focusConfirm: false,
                    showCancelButton: true,
                    preConfirm: () => { }
                }).then((result) => {
                    if (result.isConfirmed) {
                        Swal.fire({
                            title: 'Booking Complete!',
                            html: 'We will redirect you to "My booking" in <b></b> milliseconds.',
                            timer: 3000,
                            timerProgressBar: true,
                            icon: 'success',
                            confirmButtonText: 'Close',
                            didOpen: () => {
                                // Swal.showLoading()

                                const b = Swal.getHtmlContainer().querySelector('b')
                                timerInterval = setInterval(() => {
                                    b.textContent = Swal.getTimerLeft()
                                }, 100)
                            },
                            willClose: () => {
                                clearInterval(timerInterval)
                            }
                        }).then((result) => {
                            if (result.dismiss === Swal.DismissReason.timer) {
                                return [
                                    fetch(url + '/booking', {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json'
                                        },
                                        body: JSON.stringify({
                                            "id": null,
                                            "location": location_name,
                                            "check in": chkin,
                                            "check out": chkout,
                                            "adult": adult,
                                            "children": children,
                                            "firstname": fname,
                                            "lastname": lname,
                                            "email": email,
                                            "phone": phone,
                                            "tent": 'N/A', // N/A (Not Available) = ไม่มีตัวเลือกนี้ให้เลือก
                                            "tent_amount": 'N/A',
                                            "fishing": 'N/A',
                                            "moo-gata": moo_gata,
                                            "moo-gata-size": 'N/A',
                                            "total price": totalPrice

                                        })

                                    }).then(response => response.json())
                                        .then(data => console.log(data))
                                        .catch(error => console.log(error))
                                ],
                                    window.open("booking.html")
                            } else {
                                return [
                                    fetch(url + '/booking', {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json'
                                        },
                                        body: JSON.stringify({
                                            "id": null,
                                            "location": location_name,
                                            "check in": chkin,
                                            "check out": chkout,
                                            "adult": adult,
                                            "children": children,
                                            "firstname": fname,
                                            "lastname": lname,
                                            "email": email,
                                            "phone": phone,
                                            "tent": 'N/A',
                                            "tent_amount": 'N/A',
                                            "fishing": 'N/A',
                                            "moo-gata": moo_gata,
                                            "moo-gata-size": 'N/A',
                                            "total price": totalPrice

                                        })

                                    }).then(response => response.json())
                                        .then(data => console.log(data))
                                        .catch(error => console.log(error))
                                ]
                            }
                        })
                    }
                })
                break;
            case 'Phu chee dao':
                var tent = parseInt(document.getElementById('tent').value)
                var moo_gata_size = parseInt(document.getElementById('moo-gata-size').value)
                var size = ''
                if (moo_gata_size == 300) {
                    size = 'Small'
                } else {
                    size = 'Large'
                }

                var tent_amount = document.getElementById('tent-amount').value
                if (tent_amount == '') {
                    totalPrice = site_price + moo_gata_size
                } else {
                    tent_amount = parseInt(tent_amount)
                    totalPrice = site_price + moo_gata_size + (tent * tent_amount)
                }

                Swal.fire({
                    title: 'Confirmation Your Booking',
                    html:
                        `<div class="mb-3">
                    <label class="form-label">Location</label><br>
                    <input class="form-control" type="text" value="${location_name}" disabled><br>
                    <label class="form-label">Check in Date:</label><br>
                    <input class="form-control" type="text" value="${chkin}" disabled><br>
                    <label class="form-label">Check out Date:</label><br>
                    <input class="form-control" type="text" value="${chkout}" disabled><br>
                    <label class="form-label">Adult (person)</label><br>
                    <input class="form-control" type="text" value="${adult}" disabled><br>
                    <label class="form-label">Children (person)</label><br>
                    <input class="form-control" type="text" value="${children}" disabled><br>
                    <label class="form-label">Firstname</label><br>
                    <input class="form-control" type="text" value="${fname}" disabled><br>
                    <label class="form-label">Lastname</label><br>
                    <input class="form-control" type="text" value="${lname}" disabled><br>
                    <label class="form-label">Email</label><br>
                    <input class="form-control" type="text" value="${email}" disabled><br>
                    <label class="form-label">Phone</label><br>
                    <input class="form-control" type="text" value="${phone}" disabled><br>
                    <label class="form-label">Total Price</label><br>
                    <input class="form-control" type="text" value="${totalPrice}" disabled><br>
                    </div>`,
                    // '<label class="form-label"><b>Booking Detail</b></label><hr class="hr">'+
                    // `
                    // <input id="swal-input1" class="swal2-input" value="${chkin}" disable>` +
                    // `<input id="swal-input2" class="swal2-input" value="${chkout}"disable>` +
                    // `<input id="swal-input3" class="swal2-input" value="${adult}"disable>` +
                    // `<input id="swal-input4" class="swal2-input" value="${children}"disable>`+
                    // `<input id="swal-input5" class="swal2-input" value="${totalPrice}"disable>`,
                    focusConfirm: false,
                    showCancelButton: true,
                    preConfirm: () => {
                    }
                }).then((result) => {
                    if (result.isConfirmed) {
                        Swal.fire({
                            title: 'Booking Complete!',
                            html: 'We will redirect you to "My booking" in <b></b> milliseconds.',
                            timer: 3000,
                            timerProgressBar: true,
                            icon: 'success',
                            confirmButtonText: 'Close',
                            didOpen: () => {
                                // Swal.showLoading()

                                const b = Swal.getHtmlContainer().querySelector('b')
                                timerInterval = setInterval(() => {
                                    b.textContent = Swal.getTimerLeft()
                                }, 100)
                            },
                            willClose: () => {
                                clearInterval(timerInterval)
                            }
                        }).then((result) => {
                            if (result.dismiss === Swal.DismissReason.timer) {
                                return [
                                    fetch(url + '/booking', {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json'
                                        },
                                        body: JSON.stringify({
                                            "id": null,
                                            "location": location_name,
                                            "check in": chkin,
                                            "check out": chkout,
                                            "adult": adult,
                                            "children": children,
                                            "firstname": fname,
                                            "lastname": lname,
                                            "email": email,
                                            "phone": phone,
                                            "tent": tent,
                                            "tent_amount": tent_amount,
                                            "fishing": 'N/A',
                                            "moo-gata": moo_gata_size,
                                            "moo-gata-size": size,
                                            "total price": totalPrice
                                        })
                                    }).then(response => response.json())
                                        .then(data => console.log(data))
                                        .catch(error => console.log(error)),
                                    window.open("booking.html")
                                ]
                            } else {
                                return [
                                    fetch(url + '/booking', {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json'
                                        },
                                        body: JSON.stringify({
                                            "id": null,
                                            "location": location_name,
                                            "check in": chkin,
                                            "check out": chkout,
                                            "adult": adult,
                                            "children": children,
                                            "firstname": fname,
                                            "lastname": lname,
                                            "email": email,
                                            "phone": phone,
                                            "tent": tent,
                                            "tent_amount": tent_amount,
                                            "fishing": 'N/A',
                                            "moo-gata": moo_gata_size,
                                            "moo-gata-size": size,
                                            "total price": totalPrice
                                        })
                                    }).then(response => response.json())
                                        .then(data => console.log(data))
                                        .catch(error => console.log(error))
                                ]
                            }
                        })
                    }
                })
                break;
            default:
                break;
        }

    }

    // Select Option
    switch (location_name) {
        case 'Camping is life': // selectOption('Camping is life','200')    <==== เรียก Function ในฝั่ง HTML พร้อมกำหนด Parameters แบบนี้
            html +=
                `<div class="mb-3">
            <label class="form-label">Rent a tent site</label>
            <br>
                <label class="form-label">You Entered : Adult <font color="#198754"><b> ${adult} </b></font> and Childred <font color="#198754"><b> ${children} </b></font> <font color="#198754"></font></label>
            <input class="form-control" type="text" value="${site_price} THB" disabled id="tentsite">
            <br>
            <label class="form-label">Fishing</label>
            <select class="form-control" id="fishing">
                <option value="0" selected>Select Your Option...</option>
                <option value="200">Yes (200 THB)</option>
            </select>
            <br>
                <br>
                <h3><b>Contact Info</b>&nbsp;<font color="#F27474">(Required)</font></h3>
                <br>
            <label class="form-label">Firstname&nbsp;<font color="#F27474">*</font></label>
            <input class="form-control" type="text" placeholder="Enter your firstname" id="fname">
            <br>
            <label class="form-label">Lastname&nbsp;<font color="#F27474">*</font></label>
            <input class="form-control" type="text" placeholder="Enter your lastname" id="lname">
            <br>
            <label class="form-label">Email&nbsp;<font color="#F27474">*</font></label>
            <input class="form-control" type="text" placeholder="example@gmail.com" id="email">
            <br>
            <label class="form-label">Phone Number&nbsp;<font color="#F27474">*</font></label>
            <input class="form-control" type="tel" placeholder="eg.0987654321" id="phone">
            </div>`
            break;
        case 'Pha hee': // selectOption('Pha hee','900') <==== เรียก Function ในฝั่ง HTML พร้อมกำหนด Parameters  แบบนี้
            html +=
                `<div class="mb-3">
                <label class="form-label">Rent a tent site (Free Tent) + Shelter</label>
                <br>
                <label class="form-label">You Entered : Adult <font color="#198754"><b> ${adult} </b></font> and Childred <font color="#198754"><b> ${children} </b></font> <font color="#198754"><b>(${(parseInt(adult) + parseInt(children)) * site_price} THB)</b></font></label>
                <input class="form-control" type="text" value="${site_price} THB / person" disabled id="tentsite">
                
                <br>
                <label class="form-label">Thai barbecue (Moo-gata)</label>
                <select class="form-control" id="moo-gata">
                    <option value="0" selected>Select Your Option...</option>
                    <option value="300">Yes (300 THB)</option>
                </select>
                <br>
                <br>
                <h3><b>Contact Info</b>&nbsp;<font color="#F27474">(Required)</font></h3>
                <br>
            <label class="form-label">Firstname&nbsp;<font color="#F27474">*</font></label>
            <input class="form-control" type="text" placeholder="Enter your firstname" id="fname">
            <br>
            <label class="form-label">Lastname&nbsp;<font color="#F27474">*</font></label>
            <input class="form-control" type="text" placeholder="Enter your lastname" id="lname">
            <br>
            <label class="form-label">Email&nbsp;<font color="#F27474">*</font></label>
            <input class="form-control" type="text" placeholder="example@gmail.com" id="email">
            <br>
            <label class="form-label">Phone Number&nbsp;<font color="#F27474">*</font></label>
            <input class="form-control" type="tel" placeholder="eg.0987654321" id="phone">
                </div>`
            break;

        case 'Phu chee dao': // selectOption('Phu chee dao','250','500') <==== เรียก Function ในฝั่ง HTML พร้อมกำหนด Parameters แบบนี้
            html +=
                `<div class="mb-3">
                <label class="form-label">Rent a tent site</label>
                <br>
                <label class="form-label">You Entered : Adult <font color="#198754"><b> ${adult} </b></font> and Childred <font color="#198754"><b> ${children} </b></font></label>
                <input class="form-control" type="text" value="${site_price} THB" disabled id="tentsite">
                <br>
                <div class="mb-3">
                <label class="form-label">Rent a tent</label>
                <select class="form-control" id="tent">
                    <option value="0" selected>Select Your Option...</option>
                    <option value="${tent_price}">Yes (${tent_price} THB)</option>
                </select>

                <label class="form-label">Amount</label>
                <input class="form-control" type="number" max="10" min="0" id="tent-amount" placeholder="Amount of Tent (Maximum 10)">
                <br>
                <label class="form-label">Thai barbecue (Moo-gata)</label>
                <select class="form-control" id="moo-gata-size">
                    <option value="0" selected>Select Your Option...</option>
                    <option value="300">Size : Small (300 THB)</option>
                    <option value="500">Size : Large (500 THB)</option>
                </select>
                <br>
                <br>
                <h3><b>Contact Info</b>&nbsp;<font color="#F27474">(Required)</font></h3>
                <br>
            <label class="form-label">Firstname&nbsp;<font color="#F27474">*</font></label>
            <input class="form-control" type="text" placeholder="Enter your firstname" id="fname">
            <br>
            <label class="form-label">Lastname&nbsp;<font color="#F27474">*</font></label>
            <input class="form-control" type="text" placeholder="Enter your lastname" id="lname">
            <br>
            <label class="form-label">Email&nbsp;<font color="#F27474">*</font></label>
            <input class="form-control" type="text" placeholder="example@gmail.com" id="email">
            <br>
            <label class="form-label">Phone Number&nbsp;<font color="#F27474">*</font></label>
            <input class="form-control" type="tel" placeholder="eg.0987654321" id="phone">
                </div>`
            break;
        default:
            break;
    }

    Swal.fire({
        title: 'Select your additional',
        html: html,
        showCancelButton: true,
        focusConfirm: false,
        preConfirm: () => {

            if (document.getElementById('fname').value != '' && document.getElementById('lname').value != '' && document.getElementById('email').value != '' && document.getElementById('phone').value != '') {

                var fname = document.getElementById('fname').value
                var lname = document.getElementById('lname').value
                var email = document.getElementById('email').value
                var phone = document.getElementById('phone').value
                if (location_name == 'Phu chee dao') {
                    if (document.getElementById('tent').value != 0 && document.getElementById('tent-amount').value == 0) {
                        Swal.showValidationMessage('Tent Amount Required')
                    }
                }
                if (phone.length != 10) {
                    Swal.showValidationMessage('Phone Number is Incorrect')
                } else {
                    totalPrice(location_name, fname, lname, email, phone)
                    // totalPrice(location_name,fname,lname,email,phone)
                }
            } else {
                Swal.showValidationMessage('Plese Fill Out All Form')
                // Swal.resetValidationMessage()
            }

        }
    });
}


# Term Project | RESERVE A TENT @เชียงราย
<h3 align="center">ระบบจองลานกางเต็นท์ภายในจังหวัดเชียงราย</h3>
<h4 align="center">ระบบจองลานกางเต็นท์โดยจะถูกออกแบบมาเพื่อผู้ใช้งานทั่วไป (Client) </h4> <br>
<img src="https://scontent-sin6-4.xx.fbcdn.net/v/t1.15752-9/373351245_2006570036353584_4057920758541638671_n.png?_nc_cat=103&ccb=1-7&_nc_sid=ae9488&_nc_eui2=AeGm2RV8nk7F4AaPTRSlSCKRBllHQkD6WXwGWUdCQPpZfINGE5hv_7uX1qZvVRuqA8ZutS61cZJs6MXXlvyBwkdM&_nc_ohc=uIEcJBqaSuAAX-kBZ3W&_nc_ht=scontent-sin6-4.xx&oh=03_AdQcrqaEaXoWkeH4PTVpDEV17EgnOHeF7GNIG5bL7EjaNg&oe=6521174A"
<img src="https://scontent-sin6-4.xx.fbcdn.net/v/t1.15752-9/373351245_2006570036353584_4057920758541638671_n.png?_nc_cat=103&ccb=1-7&_nc_sid=ae9488&_nc_eui2=AeGm2RV8nk7F4AaPTRSlSCKRBllHQkD6WXwGWUdCQPpZfINGE5hv_7uX1qZvVRuqA8ZutS61cZJs6MXXlvyBwkdM&_nc_ohc=uIEcJBqaSuAAX-kBZ3W&_nc_ht=scontent-sin6-4.xx&oh=03_AdQcrqaEaXoWkeH4PTVpDEV17EgnOHeF7GNIG5bL7EjaNg&oe=6521174A" height="30" width="42"
<img src="https://scontent-sin6-4.xx.fbcdn.net/v/t1.15752-9/373351245_2006570036353584_4057920758541638671_n.png?_nc_cat=103&ccb=1-7&_nc_sid=ae9488&_nc_eui2=AeGm2RV8nk7F4AaPTRSlSCKRBllHQkD6WXwGWUdCQPpZfINGE5hv_7uX1qZvVRuqA8ZutS61cZJs6MXXlvyBwkdM&_nc_ohc=uIEcJBqaSuAAX-kBZ3W&_nc_ht=scontent-sin6-4.xx&oh=03_AdQcrqaEaXoWkeH4PTVpDEV17EgnOHeF7GNIG5bL7EjaNg&oe=6521174A" height="30" width="42"
<img src="https://scontent-sin6-4.xx.fbcdn.net/v/t1.15752-9/373351245_2006570036353584_4057920758541638671_n.png?_nc_cat=103&ccb=1-7&_nc_sid=ae9488&_nc_eui2=AeGm2RV8nk7F4AaPTRSlSCKRBllHQkD6WXwGWUdCQPpZfINGE5hv_7uX1qZvVRuqA8ZutS61cZJs6MXXlvyBwkdM&_nc_ohc=uIEcJBqaSuAAX-kBZ3W&_nc_ht=scontent-sin6-4.xx&oh=03_AdQcrqaEaXoWkeH4PTVpDEV17EgnOHeF7GNIG5bL7EjaNg&oe=6521174A" height="30" width="42"
    />
<h4> โดยในไฟล์ index.html จะมีตัวเลือกให้เลือก 2 ตัวเลือก</h4>
<b><u>(ซึ่งหากนำผลงานไป Implement จริงจะไม่มีการใส่หน้า Index.html ให้ผู้ใช้เลือก)</u></b>
<ul>
    <li>User Mode</li>
    <li>Admin Mode</li>
</ul>

# Data Dictionary 📖

```
{
"booking": [
{
"id": 1,
"location": "Camping is life",
"check in": "2023-01-08",
"check out": "2023-01-09",
"adult": "1",
"children": "0",
"firstname": "qwert",
"lastname": "yuio",
"email": "tinegak215@nubotel.com",
"phone": "0661140738",
"tent": "N/A",
"tent_amount": "N/A",
"fishing": 200,
"moo-gata": "N/A",
"moo-gata-size": "N/A",
"total price": 400
}
],
"location": [
{
"id": 1,
"name": "Camping is life",
"img":
"https://scontent.fbkk5-7.fna.fbcdn.net/v/t39.30808-6/314120393_564962512276044_307674118878567834_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=730e14&_nc_eui2=AeGljxcPszkRHwmxxY2NFo0kKVD-24RqEsQpUP7bhGoSxBPAVTWdM5aT4HO_vRld3v3FaiA2wpVgyamuStU3S0N_&_nc_ohc=32xjuF3AEaMAX_dwr-W&_nc_ht=scontent.fbkk5-7.fna&oh=00_AfCU1ZaToHIqoTZsC8JC1G_cTB_zoG7rzysSbyA_M1TYHg&oe=63B9BA8A"
},
{
"id": 2,
"name": "Pha hee",
"img": "https://www.palapilii.com/wp-content/uploads/2019/09/DJI_0031.jpg"
},
{
"id": 3,
"name": "Phu chee dao",
"img": "https://s359.kapook.com/pagebuilder/88bb96f1-d403-4430-bb0f-51e17010c802.jpg"
}
]
}
```
<table style="border: red solid 1px;">
    <thead>
        <h2><b>booking :</b></h2>
    </thead>
    <tr>
        <th>Attribute Name</th>
        <th>Description</th>
        <th>Data Type</th>
        <th>Example</th>
    </tr>
    <tr>
        <td>id</td>
        <td>ID ของผู้ใช้</td>
        <td>Int</td>
        <td>1</td>
    </tr>
    <tr>
        <td>location</td>
        <td>ข้อมูลสถานที่ที่ผู้ใช้จอง</td>
        <td>String</td>
        <td>Camping is life</td>
    </tr>
    <tr>
        <td>check in</td>
        <td>วันที่ผู้ใช้จะ Check in</td>
        <td>String</td>
        <td>2023-01-08</td>
    </tr>
    <tr>
        <td>check out</td>
        <td>วันที่ผู้ใช้จะ Check out</td>
        <td>String</td>
        <td>2023-01-10</td>
    </tr>
    <tr>
        <td>adult</td>
        <td>จำนวนคน(ผู้ใหญ่)</td>
        <td>String</td>
        <td>1</td>
    </tr>
    <tr>
        <td>children</td>
        <td>จำนวนคน(เด็ก)</td>
        <td>String</td>
        <td>1</td>
    </tr>
    <tr>
        <td>firstname</td>
        <td>ชื่อจริงของผู้จอง</td>
        <td>String</td>
        <td>Lorem</td>
    </tr>
    <tr>
        <td>lastname</td>
        <td>นามสกุลจริงของผู้จอง</td>
        <td>String</td>
        <td>Ipsum</td>
    </tr>
    <tr>
        <td>email</td>
        <td>อีเมลของผู้จอง</td>
        <td>String</td>
        <td>example@mail.com</td>
    </tr>
    <tr>
        <td>phone</td>
        <td>เบอร์โทรศัพท์ของผู้จอง</td>
        <td>String</td>
        <td>0845681275</td>
    </tr>
    <tr>
        <td>tent</td>
        <td>ราคาเต็นท์ที่ผู้จองเลือก(หากมีให้เช่า)</td>
        <td>String</td>
        <td>500</td>
    </tr>
    <tr>
        <td>tent_amount</td>
        <td>จำนวนเต็นท์ที่ผู้จองต้องการ (หากมี)</td>
        <td>Int</td>
        <td>2</td>
    </tr>
    <tr>
        <td>fishing</td>
        <td>ค่าใช้จ่ายสำหรับการตกปลา (หากมี)</td>
        <td>Int</td>
        <td>200</td>
    </tr>
    <tr>
        <td>moo-gata</td>
        <td>ราคาหมูกระทะ</td>
        <td>Int</td>
        <td>500</td>
    </tr>
    <tr>
        <td>moo-gata-size</td>
        <td>Size ของหมูกระทะ</td>
        <td>String</td>
        <td>Large</td>
    </tr>
    <tr>
        <td>total price</td>
        <td>ราคารวมทั้งหมด</td>
        <td>Int</td>
        <td>1250</td>
    </tr>
</table>


<table style="border: red solid 1px;">
    <thead>
        <h2><b>location :</b></h2>
    </thead>
    <tr>
        <th>Attribute Name</th>
        <th>Description</th>
        <th>Data Type</th>
        <th>Example</th>
    </tr>
    <tr>
        <td>id</td>
        <td>id ของสถานที่ที่มีลานกางเต็นท์ให้บริการ</td>
        <td>Int</td>
        <td>1</td>
    </tr>
    <tr>
        <td>name</td>
        <td>ชื่อสถานที่ที่มีลานกางเต็นท์ให้บริการ</td>
        <td>String</td>
        <td>Camping is life</td>
    </tr>
    <tr>
        <td>img</td>
        <td>รูป Thumbnail ของสถานที่</td>
        <td>String</td>
        <td>https://scontent.fbkk5-7.fna.fbcdn.net/v/t39.30808-6/314120393_564962512276044_307674118878567834_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=730e14&_nc_eui2=AeGljxcPszkRHwmxxY2NFo0kKVD-24RqEsQpUP7bhGoSxBPAVTWdM5aT4HO_vRld3v3FaiA2wpVgyamuStU3S0N_&_nc_ohc=32xjuF3AEaMAX_dwr-W&_nc_ht=scontent.fbkk5-7.fna&oh=00_AfCU1ZaToHIqoTZsC8JC1G_cTB_zoG7rzysSbyA_M1TYHg&oe=63B9BA8A</td>
    </tr>
</table>



# Languages and Tools: 🛠
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" height="30" width="42"
    alt="javascript logo" />
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" height="30" width="42"
    alt="html5 logo" />
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" height="30" width="42"
    alt="css3 logo" />
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" height="30" width="42"
    alt="nodejs logo" />
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg" height="30" width="42"
    alt="bootstrap logo" />
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" height="30" width="42"
    alt="vscode logo" />
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" height="30" width="42"
    alt="git logo" />
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg" height="30" width="42"
    alt="photoshop logo" />
<br><br>


# ลิงค์คลิป Youetube :
<div align="left">
    <a href="https://youtu.be/BZJGVPRGCu8"> <img
            src="https://img.shields.io/static/v1?message=Youtube&logo=youtube&label=&color=FF0000&logoColor=white&labelColor=&style=for-the-badge"
            height="35" alt="youtube logo" /></a>
</div>

# สมาชิกในกลุ่ม : 🤷‍♀️🤷‍♂️
- 64100738 นายกษิดิศ บุญชัย
- 64107899 นายปณชัช เอี่ยมน้ำ
- 64110455 นายภัครศักดิ์ ผลสนอง
- 64105653 นายธนวัฒน์ ศรีวิไล
<br><br>

<img height="150" width="150"
    src="https://scontent.fbkk25-1.fna.fbcdn.net/v/t39.30808-6/355867964_2413410482159526_3931598206330439985_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=a2f6c7&_nc_eui2=AeEiGCZQzbq1pK57MTPrXhFwZtalOnJFKH5m1qU6ckUofnuf4lSJfHQnVIeYlPKpESsLuSRWJS2WbWIjrwSLUnDQ&_nc_ohc=OvCU-saKBuQAX_Aua7r&_nc_ht=scontent.fbkk25-1.fna&oh=00_AfClLmHjaJG78LOJPoT3suUI0JzLXZC3_huxwMeeQPsL8Q&oe=64FE1C3B" />
<img height="150" width="150"
    src="https://scontent.fbkk25-1.fna.fbcdn.net/v/t39.30808-6/371980227_3543077902590424_4719688806673984362_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=a2f6c7&_nc_eui2=AeFkUdSklSulCZnpOFJI2BH6HvkCJJ78hNEe-QIknvyE0YcobQvHT5iylPfVMp8GjeEd7f17o6aO9LOgV8qICe9O&_nc_ohc=jyuiayf-2x8AX8bccSH&_nc_ht=scontent.fbkk25-1.fna&oh=00_AfBmdgpTVQXVNz7eQEEsnh9XNjumYWJQHvTQQ1XBvneoQw&oe=64FDA4E2" />
<img height="150" width="150"
    src="https://scontent.fbkk25-1.fna.fbcdn.net/v/t1.6435-9/70642065_539813520095903_4457384525135085568_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=8bfeb9&_nc_eui2=AeE17rUUv-06KgGQ3YuemzSJLQquRlnRabctCq5GWdFpt0jbfUC8LTpQmiSECZxFZ-_t_yIvo-rtLM8ynDsjrdU5&_nc_ohc=-jDxnSWdmEgAX-i2_4q&_nc_ht=scontent.fbkk25-1.fna&oh=00_AfBsML7PXBwz9Ffwbv5-YftCP40x45mSCMdfCreECdJ3zw&oe=65203ADE" />
<img height="150" width="150" src="https://static.vecteezy.com/system/resources/thumbnails/004/141/669/small/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg" />
<br><br>


# หลักสูตรเทคโนโลยีสารสนเทศและนวัตกรรมดิจิทัล สำนักวิชาสารสนเทศศาสตร์ 🏫
<div>
    <img height="300" width="300"
        src="https://scontent.fbkk25-1.fna.fbcdn.net/v/t39.30808-6/279560270_5821053641244444_1641496247686643675_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=a2f6c7&_nc_eui2=AeF0EY1X0Qdhl07UJiFQsaVZWylXctbtv-pbKVdy1u2_6tf9k1Ytpc8jIphmM3ZHSVw5BcDktrmF-SyZmjBluAYm&_nc_ohc=zllZx5NY8CYAX8RVUgo&_nc_ht=scontent.fbkk25-1.fna&oh=00_AfAmRf7-rV8_4mMTlBDuZiSBDz-kOs-MIC-Xk8qnvSA5SA&oe=64FE2666" />

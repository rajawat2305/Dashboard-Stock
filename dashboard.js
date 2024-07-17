async function fun(){
    let r = await fetch("http://localhost:3000/Table");
    let c = await r.json();
    let sh = document.getElementById('showdata');
    let d = c.map((e)=>`
    
    <tr>
    <td id="table"> ${e.id}</td>
    <td id="table"> ${e.stock}</td>
    <td id="table"> ${e.quantity}</td>
    <td id="table"> ${e.value}</td>
    <td id="table"> ${e.cash}</td>
    <td id="table"> <button onclick="mydelete(${e.id})">Delete</button></td>
    <td id="table"> <button onclick="myupdate(${e.id})">Edit</button></td>
    </tr>
    `).join(" ")

    sh.innerHTML=d
}
fun()

function mydelete(stock){
    fetch(`http://localhost:3000/Table/${stock}`,{
        method:'DELETE'
    })
    .then(res=>alert("Succesfully deleted"))
}

function add(){
    let data={
        id:document.getElementById('id').value,
        stock:document.getElementById('stock').value,
        quantity:document.getElementById('quantity').value,
        value:document.getElementById('value').value, 
        cash:document.getElementById('cash').value 
    }
    fetch("http://localhost:3000/Table",{
        method:"POST",
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(data)
    })
    .then(res=>alert("insserted"))
}

// var storeid=0
// function myupdate(id){
//     storeid = id;
//     document.getElementById("myfrm").style.display="block"
//     document.getElementById("id1").value=id
// }

// function update(){
//     let mydata = {
//         id:document.getElementById('id1').value,
//         stname:document.getElementById('name1').value,
//         location:document.getElementById('location1').value
//     }
//     fetch(`http://localhost:3000/Student/${storeid}`,{
//         method:"PUT",
//         headers:{
//             'Content-type':'application/json'
//         },
//         body:JSON.stringify(mydata)
//     })
//     .then( res=>alert("edit successfully"))
//     .catch(res=>alert("error"))
// }

var stid=0
async function myupdate(id){
    stid=id
    let mydata = await fetch(`http://localhost:3000/Table/${id}`)
    let con = await mydata.json()
    let show = document.getElementById('demo')
    let y = `
       <input type= "text" value="${con.id}" id="id1"><br>
       <input type= "text" value="${con.stock}" id="stock1"><br>
       <input type= "text" value="${con.quantity}" id="name1"><br>
       <input type= "text" value="${con.value}" id="loca1"><br>
       <input type= "text" value="${con.cash}" id="cash1"><br>
       <input type= "submit" onclick="edit()" value="update">
    `
    show.innerHTML=y
}

function edit(){
    let myddd = {
        id:document.getElementById('id1').value,
        stock:document.getElementById('stock1').value,
        quantity:document.getElementById('name1').value,
        value:document.getElementById('loca1').value,
        cash:document.getElementById('cash1').value
    }

    fetch(`http://localhost:3000/Table/${stid}`,{
        method:'PUT',
        headers:{
            'Content-type':'application/json'
        },
        body:JSON.stringify(myddd)
    })
    .then(res=>alert("Edit ho gaya"))
    .catch(r=>alert("error"))
}
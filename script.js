const container=document.querySelector('.container');
const seats=document.querySelectorAll('.row .seat:not(.Occupied');
const count=document.getElementById('count');
const total=document.getElementById('total');
const movieSelect=document.getElementById('movie');


populateUI();

let ticketprice= +movieSelect.value;

//save selected movie and price at local storage
function setmovieData(movieindex,movieprice){
    localStorage.setItem('selectedmovieIndex',movieindex);
    localStorage.setItem('selectedmovieprice',movieprice);
}


//update total and count
function updateSelectedCount(){
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    //console.log(selectedSeats);

    //copy selected seats into array map through array and return new array of indexes

    const seatsIndex=[...selectedSeats].map(function(seat){
        return [...seats].indexOf(seat);
    });
    //Strore at local storage
    localStorage.setItem('selectedSeats',JSON.stringify(seatsIndex));

    const selectedSeatscount=selectedSeats.length;
    count.innerText=selectedSeatscount;
    total.innerText= selectedSeatscount * ticketprice;
}

//get data from local strorage and populte UI
function populateUI(){
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    
    if(selectedSeats!== null && selectedSeats.length>0){
        seats.forEach((seat,index)=>{
           if (selectedSeats.indexOf(index)>-1){
               seat.classList.add('selected');

           }
        }
        );
    }
    const selectedmovieIndex= localStorage.getItem('selectedmovieIndex');

    if(selectedmovieIndex!= null){
        movieSelect.selectedIndex=selectedmovieIndex;
    }
}




//movie select event
movieSelect.addEventListener('change',function(e){
    ticketprice= +e.target.value;
    setmovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCount();
});

//seat select event
container.addEventListener('click',function(e){
    if (e.target.classList.contains('seat') && !e.target.classList.contains('Occupied') ){
       // console.log(e.target);
        e.target.classList.toggle('selected');

        updateSelectedCount();
    }
});
updateSelectedCount();


//initial count and total set
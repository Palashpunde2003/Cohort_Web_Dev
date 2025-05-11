// setTimeout(() => {console.log("hi");}, 1000);
// setTimeout(() => {console.log("hello");}, 3000);
// setTimeout(() => {console.log("hi there");}, 5000);



// setTimeout(function(){
//     console.log('hi');
//     setTimeout(function(){
//         console.log('hello');
//         setTimeout(function(){
//     console.log('hi there');
//             },5000);},3000);},1000); 



function setTimeoutPromisfied(duration){
    return new Promise(function(resolve){
        setTimeout(resolve, duration);
    });
}

// setTimeoutPromisfied(1000).then(function(){
//     console.log('hi');
//     setTimeoutPromisfied(3000).then(function(){
//         console.log('hello');
//         setTimeoutPromisfied(5000).then(function(){
//             console.log('hi there');
//         });
//     });
// });


// Promise Chaining
setTimeoutPromisfied(1000).then(function(){
    console.log("hi");
    return setTimeoutPromisfied(3000)
}).then(function(){
    console.log('hello');
    return setTimeoutPromisfied(5000)
}).then(function(){
    console.log('hi there');
});





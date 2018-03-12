//Submit username and login
var submit= document.getElementById('submit_btn');
submit.onclick=function()
{
    //Create a request object
    var request= new XMLHttpRequest();
    
    //Capture the response and store it in a variable
    request.onreadystatechange= function()
    {
        if(request.readystate===XMLHttpRequest.DONE)
        {
            //Take some action
            if(request.state===200)
            {
                //Capture a list of names and render a list of it
             console.log('User logged in');
             alert('Logged in successful');
             }
             else if(request.state=== 403)
             {
                 alert('Username/ password invalid');
             }
             else if(request.state=== 500)
             {
                 alert('Something went wrong on the server');
             }
        }
        //Not yet done
    };
    var username=document.getElementById('username').value;
    var password=document.getElementById('password').value;
    console.log(username);
    console.log(password);

    request.open('POST', 'http://aditi3049.imad.hasura-app.io/login', true);
    request.setRequestHeader('Content-Type','application/json');
    reques.send(JSON.stringify({username: username, password:password}));
};


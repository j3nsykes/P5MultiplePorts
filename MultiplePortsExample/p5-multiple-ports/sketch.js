let portIn;
let portOut;
let connectOutBtn;
let connectInBtn;

function setup() {
  createCanvas(400, 400);
  background(220);
//create a Serial connection
portIn = createSerial();
portOut = createSerial();

  let usedPorts = usedSerialPorts();
  console.log(usedPorts)

//manually connect each port 
//update the index number [0] to be the correct Arduino port
  if (usedPorts.length > 0) {
    portIn.open(usedPorts[0], 9600);
    portOut.open(usedPorts[1], 9600); //next index in list. 
  }

  //first run you may need to select the ports via button


  connectInBtn = createButton('Connect to Arduino In');
  connectInBtn.position(10, 20);
  connectInBtn.mousePressed(connectInBtnClick);

  connectOutBtn = createButton('Connect to Arduino Out');
  connectOutBtn.position(200, 20);
  connectOutBtn.mousePressed(connectOutBtnClick);
}

function draw() {
  

  // reads in complete lines and prints them at the
  // bottom of the canvas
  let val = portIn.readUntil("\n");
  if (val.length > 0) {
    background(220);
    //display the incoming data
    fill(0);
    text(val, 10, height-20);
    
    //do something with the data!
    noStroke();
    fill(255,200,0);
    //x,y,w,h
    ellipse(200,200,val,val);
    
  }

  // changes button label based on connection status
  if (!portOut.opened()) {
    connectOutBtn.html('Connect to Arduino Out');
  } else {
    connectOutBtn.html('Disconnect Out');
  }

  if (!portIn.opened()) {
    connectInBtn.html('Connect to Arduino In');
  } else {
    connectInBtn.html('Disconnect In');
  }


}//end of draw

function mousePressed(){
//send a value back to another Arduino
  portOut.write(mouseX);
}

function connectOutBtnClick() {
  if (!portOut.opened()) {
    portOut.open('Arduino', 9600);
  } else {
    portOut.close();
  }
}

function connectInBtnClick() {
  if (!portIn.opened()) {
    portIn.open('Arduino', 9600);
  } else {
    portIn.close();
  }
}


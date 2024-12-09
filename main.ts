// Enable motor
motobit.enable(MotorPower.On);

// Function to control motors
function setMotors(leftSpeed: number, rightSpeed: number): void {
    leftSpeed = Math.max(-100, Math.min(100, leftSpeed));
    rightSpeed = Math.max(-100, Math.min(100, rightSpeed));
    const leftDirection = leftSpeed >= 0 ? MotorDirection.Forward : MotorDirection.Reverse;
    const rightDirection = rightSpeed >= 0 ? MotorDirection.Forward : MotorDirection.Reverse;
    motobit.setMotorSpeed(Motor.Left, leftDirection, Math.abs(leftSpeed));
    motobit.setMotorSpeed(Motor.Right, rightDirection, Math.abs(rightSpeed));
}

// Function to move the servos as "arms"
function moveArms(): void {
    for (let index = 0; index < 3; index++) {
        pins.servoWritePin(leftArmServo, 0);  // Left arm down
        pins.servoWritePin(rightArmServo, 180); // Right arm up
        basic.pause(500);
        pins.servoWritePin(leftArmServo, 180); // Left arm up
        pins.servoWritePin(rightArmServo, 0); // Right arm down
        basic.pause(500);
    }
}

// Function to move forward and backward
function forwardAndBackward(): void {
    // Move forward
    setMotors(50, 50);  // Both motors forward
    basic.pause(1000);  // Move forward for 1 second

    // Move backward
    setMotors(-50, -50);  // Both motors in reverse
    basic.pause(1000);  // Move backward for 1 second

    // Stop
    setMotors(0, 0);  // Freeze the robot
    basic.pause(500);
}

// Function to spin the robot
function spinInPlace(): void {
    setMotors(50, -50);  // Spin clockwise
    basic.pause(1000);  // Spin duration
    setMotors(-50, 50);  // Spin counterclockwise
    basic.pause(1000);  // Spin duration
    setMotors(0, 0);  // Stop spinning
}

// Main dance sequence
function danceSequence(): void {
    moveArms();  // Move the arms
    forwardAndBackward();  // Go forward and backward
    spinInPlace();  // Spin clockwise and counterclockwise
    moveArms();  // Move the arms again
}

// Function to loop the sequence for one minute
input.onButtonPressed(Button.AB, function () {
    basic.showString("GO");  // Indicate the start of the sequence
    const startTime = input.runningTime();  // Get the current time in milliseconds

    while (input.runningTime() - startTime < 60000) {  // Loop for 60 seconds (1 minute)
        danceSequence();  // Perform the dance sequence
    }

    setMotors(0, 0);  // Stop all motion after the loop
    basic.showString("DONE");  // Indicate completion
});

// Variables for arm servo pins
let leftArmServo = AnalogPin.P15;  // Left arm servo on P15
let rightArmServo = AnalogPin.P16;  // Right arm servo on P16

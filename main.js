song = "";
song1 = "";
song2 = "";

song1status = "";
song2status = "";

scoreleftWrist = 0;
scorerightWrist = 0;

leftWristX = 0;
leftWristY = 0;

rightWristX = 0;
rightWristY = 0;

function preload()
{
    song1 = loadSound("song1.mp3");
    song2 = loadSound("song2.mp3");
}

function setup()
{
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses)
}
function modelLoaded()
{
    console.log('PoseNet Is Inistalized');
}
function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + "leftWristY = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + "rightWristY = " + rightWristY);

        scoreleftWrist = results[0].pose.keypoints[9].score;
        scorerightWrist = results[0].pose.keypoints[10].score;
    }

}
function draw()
{
    image(video, 0, 0, 600, 500);
    
    fill("red");
    stroke("red");

    song1status = song1.isPlaying();
    song2status = song2.isPlaying();

    if(scoreleftWrist > 0.2)
    {
        circle(leftWristX, leftWristY, 40);
        song2.stop();

        if(song1status == false);
    {
        document.getElementById("song_name").innerHTML = "Song1";
        song1.play();
    }
    }

    if(scorerightWrist > 0.2)
    {
        circle(rightWristX, rightWristY, 40);
        song1.stop();

        if(song2status == false);
    {
        document.getElementById("song_name").innerHTML = "Song2";
        song2.play();
    }
    }
}

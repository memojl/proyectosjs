<?php
//No validado para el caso $n = 6
$n = 5;
if($n == 0){
    echo "ERROR";exit();
}

for($i = 1;$i <=$n; $i++ ){
    for($j = 1; $j <= $n; $j++){
        
        if((($j==$n || $j==1) && ($i==1 || $i==5)) || (($j==2 || $j==4 ) && ($i==2 || $i==4)) || ($j==3 && $i==3)){        
            echo "X";
        }else{
            echo "_";
        }

    }
    echo "<br>";
}


$myArray = array(1,2,2,4,5,6,7,8,8,8);

$arr = array_count_values($myArray);

arsort($arr); //sort descending maintain keys

$occurences = reset($arr); //get the first value )
$mostFrequentNumber = key($arr); //get the key, as we are rewound it's the first key

echo "Longest: ".$ocurrences;
echo "Number: ". $mostFrequentNumber;

#!/bin/sh

DIR="$1/*"
totalSucessQuotes='0';
totalFailureQuotes='0';
totalPremium='0';
for FILE in $DIR
do
    echo "${FILE}"
    successfulQuotes=`grep -c -F 'quote status = success' ${FILE}`
    unsuccessfulQuotes=`grep -c -F 'quote status = failure' ${FILE}`
    premiumLogs=`grep -o -E 'price = [0-9]+' ${FILE} | sed -e 's/[^0-9]/ /g' | sed -e 's/^[[:space:]]*//' ` 
    #echo 'price = 1000' | sed -e 's/[^0-9]/ /g' |sed -e 's/^[[:space:]]*//'
    premium='0'
    while read -r line
    do
        value="$line"
        premium=`expr $value + $premium`
    done <<< "$premiumLogs"
    totalSucessQuotes=`expr $successfulQuotes + $totalSucessQuotes`
    totalFailureQuotes=`expr $unsuccessfulQuotes + $totalFailureQuotes`
    totalPremium=`expr $premium + $totalPremium`
done
totalQuotes=`expr $totalSucessQuotes + $totalFailureQuotes` 
averagePremium=`expr $totalPremium / $totalSucessQuotes`
echo "Successful Quotes Till Date:$totalSucessQuotes"
echo "Unsuccessful Quotes Till Date:$totalFailureQuotes"
echo "Total Quotes Processed Till Date:$totalQuotes"
echo "Total Premium Till Date:$totalPremium"
echo "Average Premium Till Date:$averagePremium"

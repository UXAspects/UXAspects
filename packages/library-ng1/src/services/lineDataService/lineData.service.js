export default function lineDataService() {

    return {
        addZeroPoints: function(passedDatapoints, dataOffset) {

            var currentX, nextX, offset;
            var newpoints = [],
                datapoints = [];

            if (dataOffset !== undefined && dataOffset !== 0)
                offset = dataOffset;
            else
                offset = 1; // default

            //if data points are passed as pairs, make them linear
            if (passedDatapoints[0].length === 2) {

                for (i = 0; i < passedDatapoints.length; i++) {
                    for (j = 0; j < passedDatapoints[0].length; j++) {
                        datapoints.push(passedDatapoints[i][j]);
                    }
                }
            } else {
                datapoints = passedDatapoints;
            }
            //insert zero point at the beginning
            var firstPoint = parseInt(datapoints[0]);

            //Add a point before the actual first point and put zero
            newpoints.push(firstPoint - offset);
            newpoints.push(0);



            for (var i = 0; i < datapoints.length; i += 2) {

                //Push the actual points
                newpoints.push(datapoints[i]);
                newpoints.push(datapoints[i + 1]);

                //Donot process last point or go beyond last point
                if (i < datapoints.length - 2) {
                    currentX = parseInt(datapoints[i]);
                    nextX = parseInt(datapoints[i + 2]);

                    //if distance between current and next points
                    // is equal to twice the offset, put a point between them
                    if (nextX - currentX === 2 * offset) {
                        newpoints.push(currentX + offset);
                        newpoints.push(0);
                    }

                    //if distance between current and next points is greater than twice the offset,
                    //put one zero point each after current point and before next point
                    else if (nextX - currentX > 2 * offset) {
                        newpoints.push(currentX + offset);
                        newpoints.push(0);
                        newpoints.push(nextX - offset);
                        newpoints.push(0);
                    }
                }

            }
            var lastpoint = datapoints[datapoints.length - 2];

            //Put a zero point after the last point
            newpoints.push(lastpoint + offset);
            newpoints.push(0);

            //now pass this as pair of elements like coordinates
            var pairedpoints = [];

            for (var j = 0; j < newpoints.length; j += 2) {
                pairedpoints.push([newpoints[j], newpoints[j + 1]]);
            }

            datapoints = pairedpoints;

            return datapoints;

        }

    };
}
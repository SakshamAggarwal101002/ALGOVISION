function Bucket_sort() {
    // Setting Time complexities
    document.getElementById("Time_Worst").innerText = "O(N^2)";
    document.getElementById("Time_Average").innerText = "Θ(N + K)";
    document.getElementById("Time_Best").innerText = "Ω(N + K)";

    // Setting Space complexity
    document.getElementById("Space_Worst").innerText = "O(N + K)";

    c_delay = 0;

    // Find the maximum and minimum values in the array
    let max_value = Math.max(...div_sizes);
    let min_value = Math.min(...div_sizes);

    // Initialize the number of buckets and bucket array
    let bucketCount = Math.floor(Math.sqrt(array_size)); // Determine the number of buckets
    let buckets = new Array(bucketCount).fill(null).map(() => []);

    // Distribute the elements into buckets based on their value
    for (let i = 0; i < array_size; i++) {
        div_update(divs[i], div_sizes[i], "yellow"); // Color update for processing

        // Determine which bucket this element should go into
        let bucketIndex = Math.floor(((div_sizes[i] - min_value) / (max_value - min_value)) * (bucketCount - 1));
        buckets[bucketIndex].push(div_sizes[i]);

        div_update(divs[i], div_sizes[i], "blue"); // Color update after insertion into bucket
    }

    // Sort each individual bucket using a simple sorting algorithm (e.g., Insertion Sort)
    for (let i = 0; i < buckets.length; i++) {
        if (buckets[i].length > 1) {
            insertionSortForBuckets(buckets[i]);
        }
    }

    // Merge the sorted buckets back into the original array
    let index = 0;
    for (let i = 0; i < buckets.length; i++) {
        for (let j = 0; j < buckets[i].length; j++) {
            div_sizes[index] = buckets[i][j];
            div_update(divs[index], div_sizes[index], "red"); // Height update for sorted elements
            index++;
        }
    }

    // Final color update to show sorting completion
    for (let i = 0; i < array_size; i++) {
        div_update(divs[i], div_sizes[i], "#ff6f61");
    }

    enable_buttons();
}

// Helper function to sort individual buckets using Insertion Sort
function insertionSortForBuckets(arr) {
    for (let i = 1; i < arr.length; i++) {
        let key = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}

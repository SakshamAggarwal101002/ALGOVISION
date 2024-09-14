function Counting_sort() {
    // Setting Time complexities
    document.getElementById("Time_Worst").innerText = "O(N + K)";
    document.getElementById("Time_Average").innerText = "Θ(N + K)";
    document.getElementById("Time_Best").innerText = "Ω(N + K)";

    // Setting Space complexity
    document.getElementById("Space_Worst").innerText = "O(N + K)";

    c_delay = 0;

    let max = Math.max(...div_sizes);
    let min = Math.min(...div_sizes);
    let range = max - min + 1;

    let count = new Array(range).fill(0);
    let output = new Array(array_size).fill(0);

    // Count occurrences of each element
    for (let i = 0; i < array_size; i++) {
        div_update(divs[i], div_sizes[i], "yellow"); // Color update
        count[div_sizes[i] - min]++;
        div_update(divs[i], div_sizes[i], "blue"); // Color update
    }

    // Modify count array to store the position of elements
    for (let i = 1; i < count.length; i++) {
        count[i] += count[i - 1];
    }

    // Build the output array
    for (let i = array_size - 1; i >= 0; i--) {
        output[count[div_sizes[i] - min] - 1] = div_sizes[i];
        count[div_sizes[i] - min]--;
    }

    // Copy output array to the original array and update divs
    for (let i = 0; i < array_size; i++) {
        div_sizes[i] = output[i];
        div_update(divs[i], div_sizes[i], "red"); // Height update
    }

    // Final color update
    for (let i = 0; i < array_size; i++) {
        div_update(divs[i], div_sizes[i], "#ff6f61");
    }

    enable_buttons();
}

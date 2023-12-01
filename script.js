let bars = [90, 6, 56, 56, 82, 33, 16, 34, 41, 80, 10, 24, 74, 67, 27, 54, 49, 19, 1, 25, 98, 99, 26];

function createBars() {
  const container = document.getElementById('container');
  container.innerHTML = '';

  bars.forEach((value) => {
    const barContainer = document.createElement('div');
    barContainer.className = 'bar-container';

    const bar = document.createElement('div');
    bar.className = 'bar';
    bar.style.height = `${value * 3}px`;

    const barText = document.createElement('div');
    barText.className = 'bar-text';
    barText.textContent = value;

    barContainer.appendChild(bar);
    barContainer.appendChild(barText);
    container.appendChild(barContainer);
  });
}

function randomizeArray() {
  bars = bars.sort(() => Math.random() - 0.5);
  createBars();
}

function insertionSort() {
  for (let i = 1; i < bars.length; i++) {
    let current = bars[i];
    let j = i - 1;

    while (j >= 0 && bars[j] > current) {
      bars[j + 1] = bars[j];
      j--;
    }
    bars[j + 1] = current;
  }
}

function selectionSort() {
  for (let i = 0; i < bars.length - 1; i++) {
    let minIndex = i;

    for (let j = i + 1; j < bars.length; j++) {
      if (bars[j] < bars[minIndex]) {
        minIndex = j;
      }
    }
    if (minIndex !== i) {
      let temp = bars[i];
      bars[i] = bars[minIndex];
      bars[minIndex] = temp;
    }
  }
}

function bubbleSort() {
  let len = bars.length;
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len - i - 1; j++) {
      if (bars[j] > bars[j + 1]) {
        let temp = bars[j];
        bars[j] = bars[j + 1];
        bars[j + 1] = temp;
      }
    }
  }
}

function quickSort(arr = bars) {
  if (arr.length <= 1) return arr;

  const pivot = arr[0];
  const left = [];
  const right = [];

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < pivot) left.push(arr[i]);
    else right.push(arr[i]);
  }

  return [...quickSort(left), pivot, ...quickSort(right)];
}

function mergeSort(arr = bars) {
  if (arr.length <= 1) return arr;

  const mid = Math.floor(arr.length / 2);
  const left = arr.slice(0, mid);
  const right = arr.slice(mid);

  return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
  let result = [];
  let leftIndex = 0;
  let rightIndex = 0;

  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] < right[rightIndex]) {
      result.push(left[leftIndex]);
      leftIndex++;
    } else {
      result.push(right[rightIndex]);
      rightIndex++;
    }
  }

  return result.concat(left.slice(leftIndex), right.slice(rightIndex));
}

function shellSort() {
  let len = bars.length;
  for (let gap = Math.floor(len / 2); gap > 0; gap = Math.floor(gap / 2)) {
    for (let i = gap; i < len; i++) {
      let temp = bars[i];
      let j;

      for (j = i; j >= gap && bars[j - gap] > temp; j -= gap) {
        bars[j] = bars[j - gap];
      }
      bars[j] = temp;
    }
  }
}

function startSorting(algorithm) {
  switch (algorithm) {
    case 'insertion':
      insertionSort();
      break;
    case 'selection':
      selectionSort();
      break;
    case 'bubble':
      bubbleSort();
      break;
    case 'quick':
      bars = quickSort();
      break;
    case 'merge':
      bars = mergeSort();
      break;
    case 'shell':
      shellSort();
      break;
    default:
      break;
  }
  createBars();
}

function changeSize() {
  bars = bars.map(value => value * 0.8);
  createBars();
}

createBars();

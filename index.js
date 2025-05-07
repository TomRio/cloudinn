/*
=========================
Display fetch + animation
=========================
*/


 // Defines the API endpoint URL for fetching tag data
 const apiUrl = 'http://localhost:1337/api/index?populate[display][populate]=label';

 // Async function to fetch tags and initialize the TagsCloud
 async function fetchAndDisplayTags() {
   try {
     // Sends a fetch request to the API endpoint
     const response = await fetch(apiUrl);
 
     // Checks if the response is not OK (e.g., 404, 500)
     if (!response.ok) {
       throw new Error(`HTTP error! Status: ${response.status}`);
     }
 
     // Parses the JSON response
     const data = await response.json();
 
     // Extracts the label array from the response data
     const labels = data?.data?.display?.label;
 
     // Checks if labels exist and is an array
     if (!labels || !Array.isArray(labels)) {
       throw new Error('No valid labels found in the API response');
     }
 
     // Selects the tags-cloud unordered list element from the DOM
     const tagsList = document.querySelector('.tags-cloud');
 
     // Clears the tagsList to ensure no duplicate entries
     tagsList.innerHTML = '';
 
     // Iterates over each label to create a list item
     labels.forEach(label => {
       // Checks if the tag property exists in the label
       if (!label.tag) {
         console.warn('Skipping label with missing tag property:', label);
         return;
       }
 
       // Creates a new list item element
       const li = document.createElement('li');
       // Sets the class attribute for the list item
       li.className = 'tag';
       // Creates a span element for the tag text
       const span = document.createElement('span');
       // Sets the class attribute for the span
       span.className = 'wrap';
       // Sets the text content of the span to the tag value
       span.textContent = label.tag;
       // Appends the span to the list item
       li.appendChild(span);
       // Appends the list item to the tags list
       tagsList.appendChild(li);
     });
 
     // Logs success message to console
     console.log('Tags successfully loaded and displayed');
 
     // Initializes TagsCloud after tags are added to the DOM
     const root = document.querySelector('.tags-cloud');
     const cloud = new TagsCloud(root);
     cloud.start();
 
   } catch (error) {
     // Logs the error to the console for debugging
     console.error('Failed to fetch or display tags:', error.message);
 
     // Selects the tags-cloud unordered list element from the DOM
     const tagsList = document.querySelector('.tags-cloud');
 
     // Clears the tagsList to prepare for error display
     tagsList.innerHTML = '';
 
     // Creates four list items with "403" text as fallback
     for (let i = 0; i < 4; i++) {
       // Creates a new list item element
       const li = document.createElement('li');
       // Sets the class attribute for the list item
       li.className = 'tag';
       // Creates a span element for the error text
       const span = document.createElement('span');
       // Sets the class attribute for the span
       span.className = 'wrap';
       // Sets the text content to "403"
       span.textContent = '403';
       // Appends the span to the list item
       li.appendChild(span);
       // Appends the list item to the tags list
       tagsList.appendChild(li);
     }
 
     // Logs message indicating fallback display
     console.warn('Displayed fallback 403 tags due to error');
 
     // Initializes TagsCloud with fallback tags to ensure animation
     const root = document.querySelector('.tags-cloud');
     const cloud = new TagsCloud(root);
     cloud.start();
   }
 }
 
 // FibonacciSphere and TagsCloud classes (unchanged from provided script)
 function _classPrivateMethodGet(receiver, privateSet, fn) {
   if (!privateSet.has(receiver)) {
     throw new TypeError("attempted to get private field on non-instance");
   }
   return fn;
 }
 function _classPrivateFieldSet(receiver, privateMap, value) {
   var descriptor = privateMap.get(receiver);
   if (!descriptor) {
     throw new TypeError("attempted to set private field on non-instance");
   }
   if (descriptor.set) {
     descriptor.set.call(receiver, value);
   } else {
     if (!descriptor.writable) {
       throw new TypeError("attempted to set read only private field");
     }
     descriptor.value = value;
   }
   return value;
 }
 function _classPrivateFieldGet(receiver, privateMap) {
   var descriptor = privateMap.get(receiver);
   if (!descriptor) {
     throw new TypeError("attempted to get private field on non-instance");
   }
   if (descriptor.get) {
     return descriptor.get.call(receiver);
   }
   return descriptor.value;
 }
 var _points = new WeakMap();
 class FibonacciSphere {
   get points() {
     return _classPrivateFieldGet(this, _points);
   }
   constructor(N) {
     _points.set(this, { writable: true, value: void 0 });
     _classPrivateFieldSet(this, _points, []);
     const goldenAngle = Math.PI * (3 - Math.sqrt(5));
     for (let i = 0; i < N; i++) {
       const y = 1 - i / (N - 1) * 2;
       const radius = Math.sqrt(1 - y ** 2);
       const a = goldenAngle * i;
       const x = Math.cos(a) * radius;
       const z = Math.sin(a) * radius;
       _classPrivateFieldGet(this, _points).push([x, y, z]);
     }
   }
 }
 var _root = new WeakMap();
 var _size = new WeakMap();
 var _sphere = new WeakMap();
 var _tags = new WeakMap();
 var _rotationAxis = new WeakMap();
 var _rotationAngle = new WeakMap();
 var _rotationSpeed = new WeakMap();
 var _frameRequestId = new WeakMap();
 var _initEventListeners = new WeakSet();
 var _updatePositions = new WeakSet();
 var _onMouseMove = new WeakSet();
 var _update = new WeakSet();
 class TagsCloud {
   constructor(root) {
     _update.add(this);
     _onMouseMove.add(this);
     _updatePositions.add(this);
     _initEventListeners.add(this);
     _root.set(this, { writable: true, value: void 0 });
     _size.set(this, { writable: true, value: void 0 });
     _sphere.set(this, { writable: true, value: void 0 });
     _tags.set(this, { writable: true, value: void 0 });
     _rotationAxis.set(this, { writable: true, value: void 0 });
     _rotationAngle.set(this, { writable: true, value: void 0 });
     _rotationSpeed.set(this, { writable: true, value: void 0 });
     _frameRequestId.set(this, { writable: true, value: void 0 });
     _classPrivateFieldSet(this, _root, root);
     _classPrivateFieldSet(this, _size, _classPrivateFieldGet(this, _root).offsetWidth);
     _classPrivateFieldSet(this, _tags, root.querySelectorAll('.tag'));
     _classPrivateFieldSet(this, _sphere, new FibonacciSphere(_classPrivateFieldGet(this, _tags).length));
     _classPrivateFieldSet(this, _rotationAxis, [1, 0, 0]);
     _classPrivateFieldSet(this, _rotationAngle, 0);
     _classPrivateFieldSet(this, _rotationSpeed, 0);
     _classPrivateMethodGet(this, _updatePositions, _updatePositions2).call(this);
     _classPrivateMethodGet(this, _initEventListeners, _initEventListeners2).call(this);
     _classPrivateFieldGet(this, _root).classList.add('-loaded');
   }
   start() {
     _classPrivateMethodGet(this, _update, _update2).call(this);
     _classPrivateFieldSet(this, _frameRequestId, requestAnimationFrame(this.start.bind(this)));
   }
   stop() {
     cancelAnimationFrame(_classPrivateFieldGet(this, _frameRequestId));
   }
 }
 var _initEventListeners2 = function _initEventListeners2() {
   window.addEventListener('resize', _classPrivateMethodGet(this, _updatePositions, _updatePositions2).bind(this));
   document.addEventListener('mousemove', _classPrivateMethodGet(this, _onMouseMove, _onMouseMove2).bind(this));
 };
 var _updatePositions2 = function _updatePositions2() {
   const sin = Math.sin(_classPrivateFieldGet(this, _rotationAngle));
   const cos = Math.cos(_classPrivateFieldGet(this, _rotationAngle));
   const ux = _classPrivateFieldGet(this, _rotationAxis)[0];
   const uy = _classPrivateFieldGet(this, _rotationAxis)[1];
   const uz = _classPrivateFieldGet(this, _rotationAxis)[2];
   const rotationMatrix = [
     [cos + ux ** 2 * (1 - cos), ux * uy * (1 - cos) - uz * sin, ux * uz * (1 - cos) + uy * sin],
     [uy * ux * (1 - cos) + uz * sin, cos + uy ** 2 * (1 - cos), uy * uz * (1 - cos) - ux * sin],
     [uz * ux * (1 - cos) - uy * sin, uz * uy * (1 - cos) + ux * sin, cos + uz ** 2 * (1 - cos)]
   ];
   const N = _classPrivateFieldGet(this, _tags).length;
   for (let i = 0; i < N; i++) {
     const x = _classPrivateFieldGet(this, _sphere).points[i][0];
     const y = _classPrivateFieldGet(this, _sphere).points[i][1];
     const z = _classPrivateFieldGet(this, _sphere).points[i][2];
     const transformedX = rotationMatrix[0][0] * x + rotationMatrix[0][1] * y + rotationMatrix[0][2] * z;
     const transformedY = rotationMatrix[1][0] * x + rotationMatrix[1][1] * y + rotationMatrix[1][2] * z;
     const transformedZ = rotationMatrix[2][0] * x + rotationMatrix[2][1] * y + rotationMatrix[2][2] * z;
     const translateX = _classPrivateFieldGet(this, _size) * transformedX / 2;
     const translateY = _classPrivateFieldGet(this, _size) * transformedY / 2;
     const scale = (transformedZ + 2) / 3;
     const transform = `translateX(${translateX}px) translateY(${translateY}px) scale(${scale})`;
     const opacity = (transformedZ + 1.5) / 2.5;
     _classPrivateFieldGet(this, _tags)[i].style.transform = transform;
     _classPrivateFieldGet(this, _tags)[i].style.opacity = opacity;
   }
 };
 var _onMouseMove2 = function _onMouseMove2(e) {
   const rootRect = _classPrivateFieldGet(this, _root).getBoundingClientRect();
   const deltaX = e.clientX - (rootRect.left + _classPrivateFieldGet(this, _root).offsetWidth / 2);
   const deltaY = e.clientY - (rootRect.top + _classPrivateFieldGet(this, _root).offsetHeight / 2);
   const a = Math.atan2(deltaX, deltaY) - Math.PI / 2;
   const axis = [Math.sin(a), Math.cos(a), 0];
   const delta = Math.sqrt(deltaX ** 2 + deltaY ** 2);
   const speed = delta / Math.max(window.innerHeight, window.innerWidth) / 10;
   _classPrivateFieldSet(this, _rotationAxis, axis);
   _classPrivateFieldSet(this, _rotationSpeed, speed);
 };
 var _update2 = function _update2() {
   _classPrivateFieldSet(this, _rotationAngle, _classPrivateFieldGet(this, _rotationAngle) + _classPrivateFieldGet(this, _rotationSpeed));
   _classPrivateMethodGet(this, _updatePositions, _updatePositions2).call(this);
 };
 
 // Cursor movement handler
 function initializeCursor() {
   const cursor = document.getElementById('cursor');
   let isActivated = false;
   document.addEventListener('mousemove', e => {
     if (!isActivated) {
       cursor.classList.add('-activated');
       isActivated = true;
     }
     cursor.style.transform = `translateX(${e.clientX}px) translateY(${e.clientY}px)`;
   });
 }
 
 // Main initialization function
 function main() {
   // Initialize cursor movement
   initializeCursor();
 }
 
 // Executes fetch and cursor initialization on DOM load
 document.addEventListener('DOMContentLoaded', () => {
   main();
   fetchAndDisplayTags();
 });










 //=========================









 /*
 =========================
 description fields switch 
 =========================
 */

 

document.getElementById("security").addEventListener('click', function () {  document.getElementById("frame-text").innerHTML = "Security is a top priority for us, and our expertise in this area sets us apart from other DevOps providers. Cloud Innovation has a proven track record of delivering secure software solutions, having worked on numerous army and encrypted projects. we provide advanced security solutions that help organizations to secure their software systems against threats, both internal and external. our expertise in security helps to ensure that software is delivered with the highest level of security, minimizing the risk of breaches and maximizing the protection of sensitive data.";
    document.getElementById("security").style.color="";
    })
    document.getElementById("automation").addEventListener('click', function () {  document.getElementById("frame-text").innerHTML = "CIN provides advanced automation solutions to streamline software delivery processes and reduce the risk of human error. With automation, repetitive tasks are performed consistently and accurately, resulting in faster delivery of high-quality software. Our expertise in automation helps to optimize the software delivery pipeline, leading to improved efficiency and cost savings.";
    document.getElementById("automation").style.color="";                                            
    })
    document.getElementById("scalability").addEventListener('click', function () {  document.getElementById("frame-text").innerHTML = "Scaling software delivery capabilities to meet the needs of growing businesses is a key focus for us. CIN expertise in DevOps processes and tools helps organizations to scale their software delivery processes, ensuring that they can keep pace with business growth. Our innovative solutions help organizations to efficiently manage their resources, reduce downtime, and maintain the high availability of their software systems.";
    document.getElementById("scalability").style.color="";                                            
    })
    document.getElementById("monitoring").addEventListener('click', function () {  document.getElementById("frame-text").innerHTML = "Monitoring is a critical aspect of software delivery, and CIN provides advanced monitoring solutions to ensure the highest level of performance and quality. With real-time visibility into software delivery processes, Our monitoring solutions help to quickly detect and resolve issues, ensuring that software is delivered with the highest level of quality. Our expertise in monitoring helps to optimize the software delivery pipeline, leading to improved efficiency and cost savings.";
    document.getElementById("frame-text").style.color="";                                            
    })
    document.getElementById("continuous-integration").addEventListener('click', function () {  document.getElementById("frame-text").innerHTML = "Continuous Integration (CI) is a key DevOps practice that ensures that code changes are integrated into the codebase frequently. We provide expert guidance and tools to implement CI, helping organizations to improve the speed and reliability of their software delivery processes. With CI, code changes can be quickly and easily integrated into the codebase, reducing the risk of errors and improving software quality. Our expertise in CI helps organizations to optimize their software delivery pipeline, leading to improved efficiency and cost savings.";
    document.getElementById("continuous-integration").style.color="";                                            
    })
    
    
    function choosediv(element) {
    var curr_sel = document.querySelector('.menu.selected');
    if (curr_sel) curr_sel.classList.remove('selected');
    element.classList.add('selected');
    }
  
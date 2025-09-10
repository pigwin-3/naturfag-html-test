async function start()
{
    //mainly the same as start.js
    //starts performance timer
    var t0 = performance.now();
    document.getElementById("main").innerHTML = "<p>Loading categories...</p>";
    
    try {
        // Use dataService to get categories
        const categoriesData = await window.dataService.getCategories();
        
        // categoriesData is an array with categories and load time as last element
        const loadTime = categoriesData.pop();
        const data = categoriesData;
        
        console.log('fetched from local data ' + loadTime + ' ms');
        if (data.length > 0) {
            //makes the top of the website
            var Temp = '<div class="title">Naturfag Quiz</div><div class="top1">';
            //repeats this until all of the data is in boxes
            data.forEach((itemData) => {
                Temp += '<div class="box">';
                Temp += '<div class="box-1n3">' + itemData.Name + '</div>';
                Temp += '<div class="box-info">' + itemData.about + '</div>';
                Temp += '<div class="box-1n3"><button class="btn" id="' + itemData.ID + '" onClick="themeGet(this.id)">velg</button> </div>';
                Temp += '</div>'
            });
            //stops performance timer
            var t1 = performance.now();
            //makes the bottom bar with performance
            Temp += '</div><!-- 1/2 1 = hovedside, kategori velging, spillsiden 2 = spørsmålet, sanheten --> <div class="bottom"> data load: ' + (~~loadTime) + ' ms page build: ' + (~~(t1 - t0)) + ' ms</div>';
            //inserts the html into the document
            document.getElementById("main").innerHTML = Temp;
        }
    } catch (error) {
        console.error('Error loading categories:', error);
        document.getElementById("main").innerHTML = "<p>Error loading categories. Please check if the quiz data files are present.</p>";
    }
}
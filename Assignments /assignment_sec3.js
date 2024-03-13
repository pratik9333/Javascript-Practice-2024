const books = [
    {
      title: 'Algorithms',
      author: ['Robert Sedgewick', 'Kevin Wayne'],
      publisher: 'Addison-Wesley Professional',
      publicationDate: '2011-03-24',
      edition: 4,
      keywords: ['computer science', 'programming', 'algorithms', 'data structures', 'java', 'math', 'software', 'engineering'],
      pages: 976,
      format: 'hardcover',
      ISBN: '9780321573513',
      language: 'English',
      programmingLanguage: 'Java',
      onlineContent: true,
      thirdParty: {
        goodreads: {
          rating: 4.41,
          ratingsCount: 1733,
          reviewsCount: 63,
          fiveStarRatingCount: 976,
          oneStarRatingCount: 13
        }
      },
      highlighted: true
    },
    {
      title: 'Structure and Interpretation of Computer Programs',
      author: ['Harold Abelson', 'Gerald Jay Sussman', 'Julie Sussman (Contributor)'],
      publisher: 'The MIT Press',
      publicationDate: '2022-04-12',
      edition: 2,
      keywords: ['computer science', 'programming', 'javascript', 'software', 'engineering'],
      pages: 640,
      format: 'paperback',
      ISBN: '9780262543231',
      language: 'English',
      programmingLanguage: 'JavaScript',
      onlineContent: false,
      thirdParty: {
        goodreads: {
          rating: 4.36,
          ratingsCount: 14,
          reviewsCount: 3,
          fiveStarRatingCount: 8,
          oneStarRatingCount: 0
        }
      },
      highlighted: true
    },
    {
      title: 'Computer Systems: A Programmer\'s Perspective',
      author: ['Randal E. Bryant', 'David Richard O\'Hallaron'],
      publisher: 'Prentice Hall',
      publicationDate: '2002-01-01',
      edition: 1,
      keywords: ['computer science', 'computer systems', 'programming', 'software', 'C', 'engineering'],
      pages: 978,
      format: 'hardcover',
      ISBN: '9780130340740',
      language: 'English',
      programmingLanguage: 'C',
      onlineContent: false,
      thirdParty: {
        goodreads: {
          rating: 4.44,
          ratingsCount: 1010,
          reviewsCount: 57,
          fiveStarRatingCount: 638,
          oneStarRatingCount: 16
        }
      },
      highlighted: true
    },
    {
      title: 'Operating System Concepts',
      author: ['Abraham Silberschatz', 'Peter B. Galvin', 'Greg Gagne'],
      publisher: 'John Wiley & Sons',
      publicationDate: '2004-12-14',
      edition: 10,
      keywords: ['computer science', 'operating systems', 'programming', 'software', 'C', 'Java', 'engineering'],
      pages: 921,
      format: 'hardcover',
      ISBN: '9780471694663',
      language: 'English',
      programmingLanguage: 'C, Java',
      onlineContent: false,
      thirdParty: {
        goodreads: {
          rating: 3.9,
          ratingsCount: 2131,
          reviewsCount: 114,
          fiveStarRatingCount: 728,
          oneStarRatingCount: 65
        }
      }
    },
    {
      title: 'Engineering Mathematics',
      author: ['K.A. Stroud', 'Dexter J. Booth'],
      publisher: 'Palgrave',
      publicationDate: '2007-01-01',
      edition: 14,
      keywords: ['mathematics', 'engineering'],
      pages: 1288,
      format: 'paperback',
      ISBN: '9781403942463',
      language: 'English',
      programmingLanguage: null,
      onlineContent: true,
      thirdParty: {
        goodreads: {
          rating: 4.35,
          ratingsCount: 370,
          reviewsCount: 18,
          fiveStarRatingCount: 211,
          oneStarRatingCount: 6
        }
      },
      highlighted: true
    },
    {
      title: 'The Personal MBA: Master the Art of Business',
      author: 'Josh Kaufman',
      publisher: 'Portfolio',
      publicationDate: '2010-12-30',
      keywords: ['business'],
      pages: 416,
      format: 'hardcover',
      ISBN: '9781591843528',
      language: 'English',
      thirdParty: {
        goodreads: {
          rating: 4.11,
          ratingsCount: 40119,
          reviewsCount: 1351,
          fiveStarRatingCount: 18033,
          oneStarRatingCount: 1090
        }
      }
    },
    {
      title: 'Crafting Interpreters',
      author: 'Robert Nystrom',
      publisher: 'Genever Benning',
      publicationDate: '2021-07-28',
      keywords: ['computer science', 'compilers', 'engineering', 'interpreters', 'software', 'engineering'],
      pages: 865,
      format: 'paperback',
      ISBN: '9780990582939',
      language: 'English',
      thirdParty: {
        goodreads: {
          rating: 4.7,
          ratingsCount: 253,
          reviewsCount: 23,
          fiveStarRatingCount: 193,
          oneStarRatingCount: 0
        }
      }
    },
    {
      title: 'Deep Work: Rules for Focused Success in a Distracted World',
      author: 'Cal Newport',
      publisher: 'Grand Central Publishing',
      publicationDate: '2016-01-05',
      edition: 1,
      keywords: ['work', 'focus', 'personal development', 'business'],
      pages: 296,
      format: 'hardcover',
      ISBN: '9781455586691',
      language: 'English',
      thirdParty: {
        goodreads: {
          rating: 4.19,
          ratingsCount: 144584,
          reviewsCount: 11598,
          fiveStarRatingCount: 63405,
          oneStarRatingCount: 1808
        }
      },
      highlighted: true
    }
  ];

  // assignment - Sets
  const allKeywords = [];

  for(const {keywords} of books){
    allKeywords.push(...keywords)
  }
  const uniqueKeywords = new Set(allKeywords)
  uniqueKeywords.add("coding")
  uniqueKeywords.add("Computer Science")
  uniqueKeywords.delete("business")

  const uniqueKeywordsArr = [...uniqueKeywords]

  uniqueKeywords.clear();

  // assignemnt - Maps: Fundamentals
  const bookMap = new Map([['title', 'Clean Code'], ['author', 'Robert C. Martin']]
  )

  bookMap.set("pages", 464)

  console.log(bookMap.get("title")+" By "+bookMap.get("author"));

  console.log(bookMap.size)

  if (bookMap.has('author')) console.log('The author is known');

  // Array Destructuring -  An es6 feature, used to unpacking values from an array or an object into seperate variables - break a complex data structure -> simpler data structure. 

  // Assignment - Destructuring Arrays

  const [, , thirdBook] = books;

  const ratings = [['rating', 4.19], ['ratingsCount', 144584]];

  const [[, rating], [, ratingsCount]] = ratings;

  const ratingStars = [63405, 1808];

  const [fiveStarRatings, oneStarRatings, threeStarRatings = 0] = ratingStars;

  // Assignment - Object Destructuring

  const { title, author, ISBN } = books[0];

  const {keywords: tags} = books[0];

  const {language, programmingLanguage = 'unknown'} = books[6];

  let bookTitle = 'unknown';
  let bookAuthor = 'unknown';

  // NOTE -  when we start a line by curly braces, {, then javascript expects the codeblock, and since we cannot assign anything to the codeblock, therefore javascript throws unexpected token, so to solve all of this there, the trick is to wrap all of this into parathensis.

  ({title: bookTitle, author: bookAuthor} = books[0]);

  const {thirdParty: {goodreads: {rating: bookRating}}} = books[0];

  function printBookInfo({title, author, year = 'year unknown'}) {
    console.log(`${title} by ${author}, ${year}`);
  }

  // spread operator 
  // used to Expand an array into all its elements. so basically unpacking all the array elements at once. doesnt create new variables. we can use this whenever we write values seperated by commas. used building an array or when we pass value to Functions .it also works on objects.

  //  Assignment - Spread
  const bookAuthors = [...books[0].author, ...books[1].author];

  const spellWord = (str) => {
    // console.log(...str);
  }

  spellWord('JavaScript')

  // rest operator - pack all the elements into the array. its called rest because it takes the elements of array and put them into the new array. the rest pattern basically collects the elements that Are unused in the destructuring assignment. spread operator - expand. rest operator - compress.

  // Assignment - Rest

  const [mainKeyword, ...rest] = books[0].keywords;

  const [authorOne, ...restOfTheAuthor] = books[1].author;

  const printBookAuthorsCount = (title, ...author) => {
    // console.log(`The Book ${title} has ${author.length} authors`);
  }

  // Assignment - short circuting

  const hasExamplesInJava = function (bookobj){
    return  bookobj.programmingLanguage === "Java" || "no data available"; 
  }
  for(const book of books){
    book.onlineContent === true && console.log(`${book.title} provides online content`);
  }
  
  // Assignment - Nullish Coalescing operator

  for(const book of books){
    book.onlineContent ?? console.log(`${book.title} provides no data about its online content`);
  }

  // Assignment - Logical Assignment Operator

  for(const book of books){
    book.edition ??= book.edition = 1;
  }


  // for of loop 

  // assignment 
  const allAuthors = [];

  for(const {author} of books){
    if(typeof author === "object") allAuthors.push(...author);
    else allAuthors.push(author)
  }


  printBookAuthorsCount(books[0].title, ...books[0].author)


  // assignmemt - optional chaining
  const getFirstKeyword = function(book){
    return book.keywords?.[0];
  }

  getFirstKeyword(books[0]);


  // assignment - Looping Objects: Object Keys, Values and Entries

  // NOTE - The Object.values() method returns an array, which means you can call the Array's entries() method on it, for example, Object.entries(books[0].thirdParty.goodreads).entries(). The Array's entries() method returns [index, value] arrays for each element in the array.

  const entries = [];

  for(const data of Object.keys(books[0].thirdParty.goodreads)){
    entries.push([data]);
  }

  for(const [index, value] of Object.values(books[0].thirdParty.goodreads).entries()){
    entries[index].push(value);
  }

  // assignment - Maps: Iteration

  const firstBookMap = new Map(Object.entries(books[0]));

  for(const [key,value] of firstBookMap){
    typeof value === "number" && console.log(key)
  }

  // Working with Strings - Part 1

  const quote = 'A computer once beat me at chess, but it was no match for me at kick boxing';

  console.log(quote.indexOf("chess"));

  console.log(quote.slice(quote.lastIndexOf(' ') + 1));

  const isContributor = function(authorName){
    return authorName.toLowerCase().indexOf("contributor") > 0
  }

  console.log(isContributor('Julie Sussman'));

  



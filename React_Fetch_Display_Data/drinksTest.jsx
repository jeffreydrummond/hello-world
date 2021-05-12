const mystyle = {
  color: "white",
  backgroundColor: "DodgerBlue",
  padding: "10px",
  fontFamily: "Arial"
};

const Header = () => {
  return (
    <div className="container">
      <div>
        <div className="row" style={mystyle}>
          <div className="col"></div>
          <span className="col"><h3>Cocktail Name</h3></span>
          <span className="col"><h3>Cocktail Type</h3></span>
          <span className="col"><h3>Ingredients</h3></span>
          <span className="col"><h3>Instructions</h3></span>
        </div>
      </div>
    </div>
  );
};
const Pagination = ({ items, pageSize, onPageChange }) => {
  const { Button } = ReactBootstrap;
  if (items.length <= 1) return null;

  let num = Math.ceil(items.length / pageSize);
  let pages = range(1, num + 1);
  const list = pages.map(page => {
    return (
      <Button key={page} onClick={onPageChange} className="page-item" style={{margin: '0 2px'}}>
        {page}
      </Button>
    );
  });
  return (
    <nav>
      <ul className="pagination" style={{display: 'flex', justifyContent: 'center', width: '100%'}}>{list}</ul>
    </nav>
  );
};
const range = (start, end) => {
  return Array(end - start + 1)
    .fill(0)
    .map((item, i) => start + i);
};
const paginate = (items, pageNumber, pageSize) => {
  const start = (pageNumber - 1) * pageSize;
  let page = items.slice(start, start + pageSize);
  return page;
}
const useDataApi = (initialUrl, initialData) => {
  const { useState, useEffect, useReducer } = React;
  const [url, setUrl] = useState(initialUrl);

  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false,
    data: initialData
  });

  useEffect(() => {
    let didCancel = false;
    const fetchData = async () => {
      dispatch({ type: "FETCH_INIT" });
      try {
        const result = await axios(url);
        if (!didCancel) {
          dispatch({ type: "FETCH_SUCCESS", payload: result.data });
        }
      } catch (error) {
        if (!didCancel) {
          dispatch({ type: "FETCH_FAILURE" });
        }
      }
    };
    fetchData();
    return () => {
      didCancel = true;
    };
  }, [url]);
  return [state, setUrl];
};
const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_INIT":
      return {
        ...state,
        isLoading: true,
        isError: false
      };
    case "FETCH_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload
      };
    case "FETCH_FAILURE":
      return {
        ...state,
        isLoading: false,
        isError: true
      };
    default:
      throw new Error();
  }
};
// App that gets data from Cocktails url
function App() {
  
  const { Fragment, useState, useEffect, useReducer } = React;
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const [{ data, isLoading, isError }, doFetch] = useDataApi(
    "https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a",
    {
      drinks: []
    }
  );
  const handlePageChange = e => {
    setCurrentPage(Number(e.target.textContent));
  };
  let page = data.drinks;
  if (page.length >= 1) {
    page = paginate(page, currentPage, pageSize);
    console.log(`currentPage: ${currentPage}`);
  }
  return (
    <Fragment>
      <form>
      </form>

      {isError && <div>Something went wrong ...</div>}

      {isLoading ? (
        <div>Loading ...</div>
      ) : (
        <ul>
          <Header></Header>
          {page.map((item, index) => (
            <div className="container">
              <div className="table-wrapper">
                <div className="row">
                  <div className="col" >
                    <img src={item.strDrinkThumb} className="img-thumbnail" style={{ width: 200, height: 200 }} />
                  </div>
                  <div className="col">
                    {item.strDrink}
                  </div>
                  <div className="col">
                    {item.strCategory}
                  </div>
                  <div className="col">
                    {Object.entries(item).filter(([key, value], i) => key.startsWith("strIngredient"))
                      .filter(([key, value], i) => value !== null)
                      .map(([key, value], i) => <option key={i} value={key}>{value}</option>)}
                  </div>
                  <div className="col">
                    {item.strInstructions}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </ul>
      )}
      <Pagination
        items={data.drinks}
        pageSize={pageSize}
        onPageChange={handlePageChange}
      ></Pagination>
    </Fragment>
  );
}

// ========================================
ReactDOM.render(<App />, document.getElementById("root"));

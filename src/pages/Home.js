import { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Categories, LoadingBlock, PizzaBlock, SortPopup } from "../components";
import { setCategory, setSortBy } from "../redux/actions/filters";
import { fetchPizzas } from "../redux/actions/pizzas";
import { ADD_PIZZA_TO_CART } from "../redux/types";

const categoryNames = [
  "Мясные",
  "Вегетарианская",
  "Гриль",
  "Острые",
  "Закрытые",
];
const sortItems = [
  { name: "популярности", type: "popular", order: "desc" },
  { name: "цене", type: "price", order: "desc" },
  { name: "алфавит", type: "name", order: "asc" },
];

const Home = () => {
  const dispatch = useDispatch();
  const pizzas = useSelector((state) => state.pizzas.items);
  const isLoaded = useSelector((state) => state.pizzas.isLoaded);
  const { category, sortBy } = useSelector(({ filters }) => filters);
  const cartItems = useSelector(({ cart }) => cart.items);
  useEffect(() => {
    dispatch(fetchPizzas(sortBy, category));
    // eslint-disable-next-line
  }, [category, sortBy]);

  const onSelectCategory = useCallback((index) => {
    dispatch(setCategory(index));
    // eslint-disable-next-line
  }, []);
  const onSelectSortType = useCallback((type) => {
    dispatch(setSortBy(type));
    // eslint-disable-next-line
  }, []);
  const handleAddPizzaToCart = (obj) => {
    dispatch({
      type: ADD_PIZZA_TO_CART,
      payload: obj,
    });
  };

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          activeCategory={category}
          onClickCategory={onSelectCategory}
          items={categoryNames}
        />
        <SortPopup
          onChangeSortType={onSelectSortType}
          activeSortType={sortBy.type}
          items={sortItems}
        />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoaded
          ? pizzas.map((pizza) => {
              return (
                <PizzaBlock
                  onClickAddPizza={handleAddPizzaToCart}
                  key={pizza.id}
                  addedCount={
                    cartItems[pizza.id] && cartItems[pizza.id].items.length
                  }
                  {...pizza}
                />
              );
            })
          : Array(12)
              .fill(0)
              .map((_, index) => <LoadingBlock key={index} />)}
      </div>
    </div>
  );
};

export default Home;

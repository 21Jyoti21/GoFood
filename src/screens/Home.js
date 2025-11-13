import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
import Carousal from "../components/Carousal";

export default function Home() {
  const [search, setSearch] = useState('');
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);

  const loadData = async () => {
    let response = await fetch("http://localhost:5000/api/foodData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    response = await response.json();
    setFoodItem(response[0]);
    setFoodCat(response[1]);
    console.log(response[0], response[1]);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        <div
          id="carouselExampleFade"
          className="carousel slide carousel-fade"
          data-bs-ride="carousel"
          style={{ objectFit: "contain !important" }}
        >
          <div className="carousel-inner" id="carousel">
            <div className="carousel-caption" style={{ zIndex: "10" }}>
              <div className="d-flex justify-content-center">
                <input
                  className="form-control mr-sm-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={search}
                  onChange={(e)=>{setSearch(e.target.value)}}
                />
                {/* <button
                  className="btn btn-outline-success text-white bg-success"
                  type="submit"
                >
                  Search
                </button> */}
              </div>
            </div>
            <div className="carousel-item active">
              <img
                src="/burger.jpg"
                className="d-block w-100"
                style={{ filter: "brightness(30%" }}
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="/pizza.jpg"
                className="d-block w-100"
                style={{ filter: "brightness(30%" }}
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="/pasta.jpg"
                className="d-block w-100"
                style={{ filter: "brightness(30%" }}
                alt="..."
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>

      <div className="container">
        {foodCat.length !== 0 ? (
          foodCat.map((data) => {
            const itemsInCategory = foodItem.filter(
              (item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLocaleLowerCase()))
            );

            return (
              <div key={data._id} className="mb-4">
                <h3 className="m-3">{data.CategoryName}</h3>
                <hr />
                <div className="row">
                  {itemsInCategory.length > 0 ? (
                    itemsInCategory.map((filterItems) => (
                      <div
                        key={filterItems._id}
                        className="col-12 col-md-6 col-lg-3"
                      >
                        <Card
                          // foodName={filterItems.name}
                          options={filterItems.options[0]}
                          // imgSrc={filterItems.img}
                          foodItem={filterItems}
                        />
                      </div>
                    ))
                  ) : (
                    <div className="col-12">
                      No items found in this category
                    </div>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div>Loading data...</div>
        )}
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
}

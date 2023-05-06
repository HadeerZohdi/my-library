import { Carousel } from "antd";
import useQuotes from "./hooks/useQuotes";

const QuotesCarousel = () => {
  const { quotes } = useQuotes();

  return quotes.length > 0 ? (
    <div className="w-100 py-3">
      <h5 className="text-center">Today's Quotes</h5>
      <Carousel
        autoplay
        speed={1000}
        autoplaySpeed={5000}
        className="p-3 w-100 h-100"
      >
        {quotes?.map((item) => (
          <div className="w-100 d-flex flex-column">
            <span className="fs-6">{item.quote}</span>
            <em className="mt-2 text-end">-{item.author}</em>
          </div>
        ))}
      </Carousel>
    </div>
  ) : null;
};

export default QuotesCarousel;

import { useNavigate } from "react-router-dom";
import "../styles/category.css";

export default function CategoryCard({
  category,
  remaining,
  onDelete
}) {

  const navigate = useNavigate();

  return (
    <div
      className="category-card"
      onClick={() => navigate(`/category/${category.id}`)}
    >

      <div
        className="category-delete"
        onClick={(e) => {
          e.stopPropagation();
          onDelete(category.id);
        }}
      >
        ❌
      </div>

      <div className="category-name">
        {category.name}
      </div>

      <div className="category-remaining">
        Remaining: {remaining} €
      </div>

    </div>
  );
}
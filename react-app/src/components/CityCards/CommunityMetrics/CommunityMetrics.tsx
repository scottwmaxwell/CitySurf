import "./CommunityMetrics.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsersLine,
  faPersonWalking,
  faMapLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import Plot from "react-plotly.js";
import { useEffect, useState } from "react";
import { faStar } from "@fortawesome/free-solid-svg-icons";

// This component displays a community metrics card
export function CommunityMetrics({ cityData, header }: any) {
  const calculateAverage = (ratings: number[]) => {
    const sum = ratings.reduce((acc, num) => acc + num, 0); // Get sum for each rating
    // Calculate weighted sum
    const weightedSum = ratings.reduce(
      (acc, _, index) => acc + (index + 1) * ratings[index],
      0,
    );
    return weightedSum / sum || 0; // Avoid division by zero
  };

  return (
    <div className="card bg-dark metric">
      <h1 className="card-header">{header}</h1>
      <div className="card-content">
        {cityData.map((city: any) => {
          const ratings: number[] = Object.values(
            city.community_metrics[`${header.toLowerCase()}`],
          );
          // Only display rating if sum is greater than 0
          if (
            ratings.reduce(
              (partialSum: number, a: number) => partialSum + a,
              0,
            ) > 0
          ) {
            // Get average
            const avg = Math.round(calculateAverage(ratings));
            const stars = [];

            // Generate stars based on average rating
            for (let i = 0; i < 5; i++) {
              stars.push(
                <FontAwesomeIcon
                  key={`${city.city}-star-${i}`}
                  className={`star-icon ${i < avg ? "selected" : ""}`}
                  icon={faStar}
                />,
              );
            }
            return (
              <div key={city.city} className="d-flex">
                <p className="me-2">{city.city}</p>
                {stars}
              </div>
            );
          } else {
            return (
              <div key={city.city} className="d-flex">
                <p className="me-2">{city.city}</p>
                N/a
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}

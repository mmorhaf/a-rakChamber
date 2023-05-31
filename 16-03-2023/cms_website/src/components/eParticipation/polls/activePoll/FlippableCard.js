import React, { useState } from "react";
import FrontFaceCard from "./FrontFaceCard";
import BackFaceCard from "./BackFaceCard";
import Box from "@material-ui/core/Box";
import useCardFlipStyles from "../../../../styles/components/eParticipation/polls/activePollCardFlip";
import useHomeCardFlipStyles from "../../../../styles/components/eParticipation/polls/activeHomePollCardFlip";

export default function FlippableCard({ item, lastUpdate ,homePage}) {
  const [showResults, setShowResults] = useState(false);

  const cardFlipClasses = useCardFlipStyles();
  const homeCardFlipClasses = useHomeCardFlipStyles();
  return (
    <Box className={homePage?homeCardFlipClasses.cardFlipRoot:cardFlipClasses.cardFlipRoot}>
      <Box className={`card-body ${showResults && `flip`}`}>
        <FrontFaceCard
          item={item}
          lastUpdate={lastUpdate}
          setShowResults={setShowResults}
          showResults={showResults}
          homePage={homePage}
        />
        {showResults && (
          <BackFaceCard
            item={item}
            lastUpdate={lastUpdate}
            setShowResults={setShowResults}
            showResults={showResults}
          homePage={homePage}

          />
        )}
      </Box>
    </Box>
  );
}

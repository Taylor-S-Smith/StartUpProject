import React from 'react';
import { useNavigate } from "react-router-dom"

export function Story({chapterId}) {
    const navigate = useNavigate();

    const handleNavigation = () => {
        navigate(`/edit/${chapterId}`);
    }

    return (
      <>
        <div className="row justify-content-center my-3">
            <div className="col-11">    
                <h1>Chapter 1</h1>
                <div className="row justify-content-start px-3">
                    <div className="py-4">
                        <p>
                        This is an example of the starting text of the story.
                        When actually published I am sure I will come up with 
                        a riveting hook that will excite the reader and inspire 
                        creativity.
                        </p>
                        <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras pharetra placerat felis id tristique. Suspendisse quam lorem, condimentum id facilisis at, lobortis eu dui. Donec aliquet mollis sapien non aliquet. In et volutpat arcu, non tincidunt odio. Nunc laoreet molestie massa, sit amet imperdiet tellus bibendum quis. Phasellus convallis ullamcorper lectus, in finibus nulla pellentesque ac. Donec eleifend ultricies arcu id malesuada. Curabitur nec neque et urna laoreet volutpat sodales et elit. Mauris in tellus ante. Morbi felis est, ultrices vel aliquam vel, faucibus in nulla. Vivamus ultricies semper leo nec malesuada. Sed ullamcorper felis pulvinar risus dapibus condimentum.
                        </p>
                        <p>
                        Ut ultricies dictum nulla, et lobortis elit rutrum nec. Vestibulum quis leo cursus enim hendrerit molestie. Duis dignissim, urna ac commodo rutrum, mauris ipsum hendrerit diam, non convallis ex massa at sapien. Mauris sagittis non dolor vitae molestie. Nunc pretium elit ut est venenatis, id hendrerit purus blandit. Pellentesque sed euismod libero, vel efficitur ligula. Proin et nisi consectetur, dignissim augue in, faucibus quam.
                        </p>
                        <p>
                        Phasellus pharetra ligula dui, vel feugiat elit accumsan sit amet. Phasellus non augue non turpis dictum dapibus ut placerat massa. Sed vel metus finibus, condimentum odio vel, hendrerit leo. Aliquam suscipit tincidunt leo, posuere placerat ante pretium et. Interdum et malesuada fames ac ante ipsum primis in faucibus. Proin eu tortor quis nisl pellentesque vehicula. Maecenas quis congue dui, posuere maximus nisl.
                        </p>
                    </div>
                    <button className="btn btn-lg btn-secondary btn-block mb-1">Example Choice 1: Venture forth and to slay the dragon.</button>
                    <button className="btn btn-lg btn-secondary btn-block mb-1">Example Choice 2: Study the arcane discipline of the magi.</button>
                    <button className="btn btn-lg btn-secondary btn-block my-3" onClick={handleNavigation}>+ Add Choice</button>
                </div>
            </div>
        </div>
      </>
    );
}
/* Almost all code below (w/ some modifications) from:
https://codesandbox.io/s/9m0l4?file=/src/styles.css */

import React, { useState } from "react";
import { Nav, Form } from "react-bootstrap";
import useOnclickOutside from "react-cool-onclickoutside";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import './searchstyle.css';
import { useNavigate } from "react-router-dom";
import { createSearchParams } from "react-router-dom";
import { SearchContext } from "../../../App";
import { useContext } from "react";

const NavSearch = () => {
  const [search, setSearch] = useState();
  const toggle = () => setSearch(true);
  const closeSearch = () => (search === true ? setSearch(false) : null);
  const ref = useOnclickOutside(() => closeSearch());
  const navigate = useNavigate();
  const { setSuggestions, setPageNum } = useContext(SearchContext);

  const onEnter = (e) => {
      if (e.key === 'Enter') {
            e.preventDefault();
            setPageNum(1);
            setSuggestions([]);
            navigate({
                pathname: '/search',
                search: '?' + createSearchParams({query: e.target.value}),
            });
      }
  }

  return (
    <Nav className="my-auto" id='navbarsearch' ref={ref}>
      <Form
        className={
          search === false
            ? "navsearchbar fadeOutWidth"
            : search === true
            ? "navsearchbar fadeInWidth"
            : "navsearchbar"
        }
        onKeyDown={onEnter}
      >
        {search === true && (
          <input
            ref={ref}
            className={
              search === true
                ? "navsearch-input fadeIn"
                : search === false
                ? "navsearch-input fadeOut"
                : "navsearch-input"
            }
            type="text"
            name=""
            placeholder="Search..."
            maxLength={255}
          />
        )}
        <div
            onClick={toggle}
          className={
            search === true
              ? "navsearchicon-bg fadeOut"
              : search === false
              ? "navsearchicon-bg fadeIn"
              : "navsearchicon-bg"
          }
        >
          {search !== true && (
            <FontAwesomeIcon
              onClick={toggle}
              className={
                search === true
                  ? "navsearch-icon fadeOut"
                  : search === false
                  ? "navsearch-icon fadeIn"
                  : "navsearch-icon"
              }
              icon={faSearch}
            />
          )}
        </div>
      </Form>
    </Nav>
  )
}

export default NavSearch

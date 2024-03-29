import React, { useEffect, useState } from 'react';
import CompanyCard from './CompanyCard';
import SearchForm from '../common/SearchForm';
import JoblyApi from '../api/api';
import "./CompanyList.css";

/**
 * CompanyList component displays search bar and list of company cards
 *
 * Props: None
 *
 * State:
 * - companies: an object like {data, isLoading}
 *    - data: is an array [{handle, name, description, numEmployees, logoUrl}, ...]
 *    - isLoading: a boolean
 * - term: a string
 *
 * RoutesList -> CompanyList -> {SearchForm, CompanyCard}
 */

function CompanyList() {
  const [companies, setCompanies] = useState({ data: null, isLoading: true });
  const [term, setTerm] = useState('');

  console.log("CompanyList, companies:", companies, "term:", term);

  useEffect(function fetchCompaniesWhenMounted() {
    async function fetchCompanies() {
      const companiesResult = await JoblyApi.getAllCompanies(term);
      setCompanies({ data: companiesResult, isLoading: false });
    }
    fetchCompanies();
  }, [term]);

  /**
   * search function takes in term and updates term state and companies state.
   */

  function searchCompanies(term) {
    setCompanies({ data: null, isLoading: true });
    setTerm(term);
  }

  if (companies.isLoading) return <p>Loading...</p>;

  return (
    <div className="CompanyList-body container">
      <SearchForm term={term} search={searchCompanies} />
      {companies.data.length === 0
        ? <p>Sorry, no results were found!</p>
        : companies.data.map(
          c => <CompanyCard key={c.handle} companyData={c} />
        )
      }
    </div>
  );
};

export default CompanyList;
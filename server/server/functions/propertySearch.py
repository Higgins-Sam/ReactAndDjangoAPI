import requests
import json
from bs4 import BeautifulSoup
from django.http import JsonResponse

list_of_properties = []


def get_page(min_bedrooms, max_price, radius, detached, semi_detached, index=0):
	property_type = get_property_type_search_element(detached, semi_detached)

	URL = f"https://www.rightmove.co.uk/property-for-sale/find.html?locationIdentifier=REGION%5E93829&minBedrooms={min_bedrooms}&maxPrice={max_price}&radius={radius}&index={index}&propertyTypes={property_type}&includeSSTC=false&mustHave=&dontShow=&furnishTypes=&keywords="

	return make_soup(requests.get(URL))


def make_soup(page):
	return BeautifulSoup(page.content, "html.parser")


def get_number_of_pages(initial_page):
	total_number_of_properties = (
		initial_page.find("div", class_="searchHeader-title").find("span").get_text()
	)
	return int(int(total_number_of_properties) / 24)


def get_property_type_search_element(detached, semi_detached):
	if detached & semi_detached:
		return "detached%2Csemi-detached"
	elif semi_detached:
		return "semi-detached&secondaryDisplayPropertyType=semidetachedhouses"
	elif detached:
		return "detached&secondaryDisplayPropertyType=detachedshouses"
	else:
		return ""


def get_filter(request):
	input_object = json.loads(request.body)
	return input_object.get("filter")


def filter_properties(request):
	filtered_list = list(
			filter(
					lambda property_object: defined_filter(
							property_object, get_filter(request)
					),
					list_of_properties,
			)
	)
	return JsonResponse({"filtered_list": filtered_list})


def defined_filter(property_object, filter_on):
    if filter_on == "":
        return True
    if filter_on in property_object.get("tag"):
        return True
    elif filter_on in property_object.get("address"):
        return True
    elif filter_on in property_object.get("price"):
        return True
    else:
        return False


def search(request):
	list_of_properties.clear()
	input_object = json.loads(request.body)

	min_bedrooms = input_object.get("criteria").get("minBedrooms")
	max_price = input_object.get("criteria").get("maxPrice")
	radius = input_object.get("criteria").get("radius")
	detached = input_object.get("criteria").get("detached")
	semi_detached = input_object.get("criteria").get("semiDetached")

	total_number_of_pages = get_number_of_pages(
			get_page(min_bedrooms, max_price, radius, detached, semi_detached)
	)

	for page_number in range(total_number_of_pages):
		current_page = get_page(
			min_bedrooms, max_price, radius, detached, semi_detached, page_number * 24
		)
		page_results = current_page.find_all("div", class_="l-searchResult is-list")

		for item in page_results:
			tag = item.find("h2", class_="propertyCard-title").get_text().strip()
			address = list(
				item.find("address", class_="propertyCard-address").children
			)[5].get_text()
			price = (
				item.find("div", class_="propertyCard-priceValue").get_text().strip()
			)
			link = "https://www.rightmove.co.uk" + item.find("a", class_="propertyCard-link")['href']

			list_of_properties.append({"tag": tag, "address": address, "price": price, "link": link})

	return JsonResponse({"list_of_properties": list_of_properties})

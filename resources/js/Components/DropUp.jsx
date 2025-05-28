import { useEffect, useRef, useState } from "react";

export default function DropUp({ trigger, content, openUpward = false }) {
    const [isOpen, setIsOpen] = useState(false);
    const [alignRight, setAlignRight] = useState(false); // State for horizontal alignment
    const dropdownRef = useRef(null); // Ref for the entire dropdown container
    const triggerRef = useRef(null); // Ref for the trigger element

    // Effect to handle clicks outside the dropdown to close it
    useEffect(() => {
        function handleClickOutside(event) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Effect to determine horizontal alignment when dropdown opens
    useEffect(() => {
        if (isOpen && triggerRef.current) {
            const triggerRect = triggerRef.current.getBoundingClientRect();
            const viewportWidth =
                window.innerWidth || document.documentElement.clientWidth;
            const dropdownWidth = 224; // Tailwind's w-56 is 224px

            // Check if opening to the right would exceed the viewport width
            // We add a small margin (e.g., 20px) to avoid it being too close to the edge
            if (triggerRect.right + dropdownWidth > viewportWidth - 20) {
                setAlignRight(true); // Align to the right (meaning content appears to the left of trigger)
            } else {
                setAlignRight(false); // Align to the left (meaning content appears to the right of trigger)
            }
        }
    }, [isOpen]); // Recalculate when isOpen changes

    // Function to toggle the dropdown's open state
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="relative inline-block text-left" ref={dropdownRef}>
            {/* Dropdown Trigger */}
            {/* Assign triggerRef to the actual trigger element */}
            <div onClick={toggleDropdown} ref={triggerRef}>
                {trigger}
            </div>

            {/* Dropdown Content */}
            {isOpen && (
                <div
                    className={`
            absolute z-10 w-56 mt-2 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5
            focus:outline-none transition ease-out duration-100 transform
            ${
                openUpward
                    ? "bottom-full mb-2 origin-bottom"
                    : "top-full mt-2 origin-top"
            }
            ${
                alignRight ? "right-0" : "left-0"
            } {/* Conditional horizontal alignment */}
            ${isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"}
          `}
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="menu-button"
                    tabIndex="-1"
                >
                    {content}
                </div>
            )}
        </div>
    );
}

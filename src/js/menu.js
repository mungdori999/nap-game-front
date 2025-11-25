export function loadMenu() {
  $("#inventory-modal").dialog({
    autoOpen: false,
    modal: true,
    width: 500,
    height: 630,
    buttons: {
      close: function () {
        $(this).dialog("close");
      },
    },
  });

  // 2. inventory 버튼 클릭 시 모달 열기
  $(".inventory").on("click", () => {
    $("#inventory-modal").dialog("open");
  });
}
